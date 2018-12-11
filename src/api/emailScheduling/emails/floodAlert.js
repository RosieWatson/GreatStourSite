const floodAlert = module.exports = {}
const db = require('../../../lib/database.js')
const util = require('util')
const request = require('request')
const emailGenerator = require('../../../lib/email/generator.js')
const emailTransport = require('../../../lib/email/transporter.js')
const subscribers = require('../../../lib/email/subscribers.js')

floodAlert.config = {
  pollingDelay: 1000 * 60 * 30 // Check if new emails need to be sent every half an hour
}

// Returns the county a postcode is within
floodAlert.getCountyFromPostcode = async postcode => {
  let res = null
  // Calls off to an API to get the county of a postcode
  try {
    res = await util.promisify(request.get)(`http://api.postcodes.io/postcodes/${postcode}`)
  } catch (e) {
    console.log('Failed postcode->county conversion', postcode)
    console.log(e)
  }
  res = JSON.parse(res.body)
  if (res.status !== 200) throw new Error('Postcode API request failed')
  return res.result.admin_county
}

// Turns the floods from an array into a JSON
floodAlert.floodStatesToJson = (floods) => {
  if (!floods) return {}
  let json = {}
  floods.forEach(f => {
    json[f.id] = {
      severityLevel: f.severityLevel
    }
  })
  return json
}

// Calculates which chnges have happened to flood severity between two floodState objects
// Used to only email when a state has changed according to the last state we sent them
floodAlert.deduceNew = (oldSeverities, currSeverities) => {
  if (typeof oldSeverities !== 'object') oldSeverities = JSON.parse(oldSeverities)
  let updated = {}
  const allKeys = Array.from(new Set([].concat(Object.keys(oldSeverities), Object.keys(currSeverities)))) // Puts all the flood IDs into a non-duplicated array
  allKeys.forEach(k => {
    // Discard the data if the newest flood warning doesn't overlap with the old one
    if ((oldSeverities[k] && oldSeverities[k].severityLevel) && !currSeverities[k]) return

    // If a flood warning exists in the current but not the old model we want to keep it
    if ((currSeverities[k] && currSeverities[k].severityLevel) && !oldSeverities[k]) return updated[k] = currSeverities[k]

    // If a flood exists in both old+new we only want to store it if the level has changed in the new state
    if ((oldSeverities[k] && oldSeverities[k].severityLevel) !== (currSeverities[k] && currSeverities[k].severityLevel)) return updated[k] = currSeverities[k]
  })
  return updated
}

// Function to check if there are any new flood alerts to send and then dispatches them
floodAlert.checkAndDispatch = async () => {
  let subscribed
  // Gets the subscribers from the DB
  try {
    subscribed = await db.query(`SELECT * FROM subscribers`)
  } catch (e) {
    console.log('Failed to fetch subscriber list')
    console.log(e)
    return
  }

  // Goes through each subscriber, works out their location and then if there are any new floods to email about
  subscribed.forEach(async s => {
    s.county = await floodAlert.getCountyFromPostcode(s.postcode) // Gets the county from the postcode
    let localFloods
    // Tries to get all of the floods in a certain county
    try {
      localFloods = await db.query(`SELECT * FROM govFloods WHERE counties LIKE ?`, [`%${s.county}%`])
    } catch (e) {
      console.log('Failed to fetch flood information from DB')
      console.log(e)
      return
    }
    if (localFloods.length < 1) return // No floods near this subscriber
    const changed = floodAlert.deduceNew(JSON.parse(s.lastAlertStates), floodAlert.floodStatesToJson(localFloods)) // Gets the floods that need to be emailed about

    if (Object.keys(changed).length < 1) return // If none have changed there is no need to send an email
    const changedFloods = localFloods.filter(flood => Object.keys(changed).includes('' + flood.id)) // Gets the flood data using the IDs returned above
    const emailContent = emailGenerator.createFloodAlertEmail(s, changedFloods) // Generates an email with the flood data
    const targetEmail = subscribers.decryptEmail(s.email) // Decrypts the target email for sending
    emailTransport.sendEmail(targetEmail, 'Flood Alert for your area!', emailContent) // Sends the email

    // Update the subscriber's state in the database so we don't contact them if nothing changes
    try {
      db.query(`
        UPDATE
          subscribers
        SET
          lastAlerted = UNIX_TIMESTAMP(),
          lastAlertStates = JSON_SET(lastAlertStates, '$', ?)
        WHERE
          email = ?
      `, [JSON.stringify(changed), s.email])
    } catch (e) {
      console.log('Failed to update lastAlert data for a subscriber')
      console.log(e)
    }
  })
}
