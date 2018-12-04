const transporter = module.exports = {}
const nodemailer = require('nodemailer')
const senderAccount = 'placeholder' // need to update and store securely
const senderPassword = 'placeholder' // need to update and store securely

const nodeTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: senderAccount,
      pass: senderPassword
  }
})

transporter.emailDetails = (toEmail, subject, emailData) => {
  return {
      from: senderAccount,
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
