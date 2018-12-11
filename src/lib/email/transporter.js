const transporter = module.exports = {}
const nodemailer = require('nodemailer')
const senderAccount = 'plprtest@gmail.com'
const senderPassword = '5!@kD@3xQqu'
// NO COMMIT

const nodeTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: senderAccount,
      pass: senderPassword
  }
})

transporter.emailDetails = (toEmail, subject, emailData) => {
  return {
      from: '"Great Stour Site" <no-reply@gss.com>',
      to: toEmail,
      subject: subject,
      text: emailData.textEmail,
      html: emailData.HTMLEmail
  }
}

transporter.sendEmail = (toEmail, subject, emailData) => {
  let email = transporter.emailDetails(toEmail, subject, emailData)

  nodeTransporter.sendMail(email, (err, info) => {
      if(err) console.log(err)

      console.log(info)
  })
}
