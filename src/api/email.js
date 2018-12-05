const app = require('../server.js')
const emailGen = require('../lib/email/generator.js')
const emailTrans = require('../lib/email/transporter.js')
const subscribers = require('../lib/email/subscribers.js')

app.post('/api/email/user/subscribe', async (req, res) => {
  try {
    await subscribers.addUser(res.body)
  } catch (e) {
    console.log(e)
    return res.status(500).send('Error: failed to add user to database')
  }

  try {
    let emailTemp = await emailGen.createWelcomeEmail(req.body.name)
    await emailTrans.sendEmail(req.body.email, 'Welcome to Great Stour Flood Alerts', emailTemp)

    return res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    return res.status(500).send('Error: failed to send welcome email')
  }
})

app.post('/api/email/user/unsubscribe', async (req, res) => {
  try {
    await subscribers.removeUser(res.body.email)
    return res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    return res.status(500).send('Error: failed to remove user from database')
  }
})
