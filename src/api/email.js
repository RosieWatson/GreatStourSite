const app = require('../server.js')
const db = require('../lib/database.js')
const floodAlert = require('./emailScheduling/emails/floodAlert.js')
const emailGen = require('../lib/email/generator.js')
const emailTrans = require('../lib/email/transporter.js')
const subscribers = require('../lib/email/subscribers.js')
const validation = require('../lib/validation.js')

// API endpoints to subscriber users to flood alerts
app.post('/api/email/user/subscribe', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['email', 'name', 'postcode'])) return res.status(400).send('MISSING_PARAMETERS')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('BAD_EMAIL_FORMAT')

  // Calls off to add user to the subscribers DB
  try {
    await subscribers.addUser(req.body)
  } catch (e) {
    console.log('Failed to add user to subscription list', e)
    return res.status(500).send('FAILED_TO_STORE_SUBSCRIPTION')
    // Return if we failed to add - we DO NOT want to send a welcome email by mistake and confuse the user
  }

  // Once added to the database, attempt to send a welcome email (best-efforts)
  // If the FAILED_EMAIL_DISPATCH error is returned it may as well be ignored,
  // this user will just not receive a welcome email but will still be opted
  // in to the alerts they need.
  try {
    let emailTemp = await emailGen.createWelcomeEmail(req.body.name)
    await emailTrans.sendEmail(req.body.email, 'Welcome to Great Stour Flood Alerts', emailTemp)
    return res.status(200).send('OK')
  } catch (e) {
    console.log('Failed to dispatch welcome email', e)
    return res.status(500).send('FAILED_EMAIL_DISPATCH')
  }
})

// API endpoints to unsubscribe users from recieving flood alerts
app.post('/api/email/user/unsubscribe', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['email'])) return res.status(400).send('MISSING_PARAMETERS')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('BAD_EMAIL_FORMAT')

  // Calls off to remove user from subscriber DB
  try {
    await subscribers.removeUser(req.body.email)
    return res.status(200).send('OK')
  } catch (e) {
    console.log('Failed to unsubscribe user', req.body.email, e)
    return res.status(500).send('FAILED_TO_REMOVE_SUBSCRIPTION')
  }
})

// API endpoints to send a test email to all subscribers signed up to Kent flood alerts
app.get('/api/email/send/tests', async (req, res) => {
  // Adds a test Great Stour flood to the flood DB
  try {
    let testFlood = [
      Math.floor(Math.random() * Math.floor(50000)), // Generates a random ID that won't clash with a real flood and will allow for mutliple test emails to send
      parseInt((Date.now() + '').slice(0,-3)), // Getting the current UNIX timestamp and removing milliseconds
      'Great Stour',
      'South East',
      'South',
      '["Kent"]',
      'Test flood',
      'River levels remain high, as a result of heavy rainfall, but are beginning to fall again. Consequently, the risk of flooding remains. Flooding is affecting Low lying land and roads adjacent to the river. Other locations that may be affected include Sturry, Fordwich and Chartham. Flooding of properties is not forecast at this point. No further rainfall is forecast.  River levels have peaked and will remain steady, with no further rise forecasted.  We are closely monitoring the situation. This message will be updated as the situation changes.',
      'Flood Alert',
      3
    ]
    await db.query(`
      INSERT IGNORE into govFloods (id, timestamp, waterbody, eaAreaName, eaRegionName, counties, description, message, severity, severityLevel)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, testFlood)
  } catch (e) {
    console.log(e)
    errors.push('FAILED_TO_INSERT_TEST_FLOOD')
  }

  // Sends an email to all subscribers in the Kent area
  try {
    await floodAlert.checkAndDispatch()
  } catch (e) {
    console.log(e)
    errors.push('FAILED_TO_SEND_TEST_EMAIL')
    return res.status(500).send('FAILED_EMAIL_DISPATCH')
  }

  // Pauses for 10 seconds to allow emails to send
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 10000)
  })

  // Deletes test flood from DB 
  try {
    await db.query(`DELETE FROM govFloods WHERE description='Test flood'`)
    return res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    errors.push('FAILED_TO_DELETE_TEST_FLOOD')
    return res.status(500).send('FAILED_TO_DELETE_TEST_FLOOD')
  }
})
