const app = require('../server.js')
const emailGen = require('../lib/email/generator.js')
const emailTrans = require('../lib/email/transporter.js')

app.post('/api/email/welcome', async (req, res) => {
  try {
    let emailTemp = await emailGen.createWelcomeEmail(req.body.name)
    await emailTrans.sendEmail(req.body.email, 'Welcome to Great Stour Flood Alerts', emailTemp)

    return res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    return res.status(500).send('Error sending welcome email')
  }
})
