const floodAlert = module.exports = {}
const db = require('../../../lib/database.js')
const util = require('util')
const request = require('request')
const emailGenerator = require('../../../lib/email/generator.js')
const emailTransport = require('../../../lib/email/transporter.js')
const subscribers = require('../../../lib/email/subscribers.js')

floodAlert.config = {
  pollingDelay: 1000 * 60 * 60 * 4 // 4 hours
}

floodAlert.getCountyFromPostcode = async (postcode) => {
  let errors = []
  let res = null
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
  let updated = {}
  const allKeys = Array.from(new Set([].concat(Object.keys(oldSeverities), Object.keys(currSeverities))))

  allKeys.forEach(k => {
    // Discard the data if the newest flood warning doesn't overlap with the old one
    if ((oldSeverities[k] && oldSeverities[k].severityLevel) && !currSeverities[k]) return

    // If a flood warning exists in the current but not the old model we want to keep it
    if ((currSeverities[k] && currSeverities[k].severityLevel) && !oldSeverities[k]) return updated[k] = currSeverities[k]

    // If a flood exists in both old+new we only want to store it if the level has changed in the new state
    if (oldSeverities[k].severityLevel !== currSeverities[k].severityLevel) return updated[k] = currSeverities[k]
  })
  return updated
}

floodAlert.checkAndDispatch = async () => {
  let subscribed
  try {
    subscribed = await db.query(`SELECT * FROM subscribers`)
  } catch (e) {
    console.log('Failed to fetch subscriber list')
    console.log(e)
    return
  }
  subscribed.forEach(async s => {
    s.county = await floodAlert.getCountyFromPostcode(s.postcode)
    let localFloods
    try {
      localFloods = await db.query(`SELECT * FROM govFloods WHERE counties LIKE ?`, [`%${'North Yorkshire'}%`])
    } catch (e) {
      console.log('Failed to fetch flood information from DB')
      console.log(e)
      return
    }
    if (localFloods.length < 1) return // No floods near this subscriber

    let setJson
    if (!s.lastAlertStates) setJson = s.lastAlertStates || '{}'
    const changed = floodAlert.deduceNew(JSON.parse(setJson), floodAlert.floodStatesToJson(localFloods))
    if(changed.length < 0) return

    const changedFloods = localFloods.filter(flood => Object.keys(changed).includes('' + flood.id))
    const emailContent = emailGenerator.createFloodAlertEmail(s, changedFloods)
    const targetEmail = subscribers.decryptEmail(s.email)
    emailTransport.sendEmail(targetEmail, 'Flood Alert for your area!', emailContent)

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

;(() => {
  floodAlert.checkAndDispatch()
})()
