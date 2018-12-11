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
      localFloods = await db.query(`SELECT * FROM govFloods WHERE counties LIKE ?`, [`%${s.county}%`])
    } catch (e) {
      console.log('Failed to fetch flood information from DB')
      console.log(e)
      return
    }
    if (localFloods.length < 1) return // No floods near this subscriber
    const emailContent = emailGenerator.createFloodAlertEmail(s, localFloods)
    console.log(subscribers.encryptEmail('hello rosie you have a nice face'))
    const targetEmail = subscribers.decryptEmail(s.email)
    emailTransport.sendEmail(targetEmail, 'Flood Alert for your area!', emailContent)
  })
}

;(() => {
  floodAlert.checkAndDispatch()
})()
