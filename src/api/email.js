const app = require('../server.js')
const emailGen = require('../lib/email/generator.js')
const emailTrans = require('../lib/email/transporter.js')
const subscribers = require('../lib/email/subscribers.js')
const validation = require('../lib/validation.js')

app.post('/api/email/user/subscribe', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['email', 'name', 'postcode', 'sensor'])) return res.status(400).send('MISSING_PARAMETERS')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('BAD_EMAIL_FORMAT')

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

app.post('/api/email/user/unsubscribe', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['email'])) return res.status(400).send('MISSING_PARAMETERS')
  if (!validation.checkEmailFormat(req.body.email)) return res.status(400).send('BAD_EMAIL_FORMAT')

  try {
    await subscribers.removeUser(req.body.email)
    return res.status(200).send('OK')
  } catch (e) {
    console.log('Failed to unsubscribe user', req.body.email, e)
    return res.status(500).send('FAILED_TO_REMOVE_SUBSCRIPTION')
  }
})
