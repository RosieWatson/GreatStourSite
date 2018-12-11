const transporter = module.exports = {}
const nodemailer = require('nodemailer')
const senderAccount = process.env.EMAIL_USERNAME
const senderPassword = process.env.EMAIL_PASSWORD

// Sets up the mail transporter using a test GMail account
const nodeTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: senderAccount,
      pass: senderPassword
  }
})

// Sets the details of the email being sent
// Sends both text and HTML so it can be used on different browser types
transporter.emailDetails = (toEmail, subject, emailData) => {
  return {
      from: '"Great Stour Site" <no-reply@gss.com>',
      to: toEmail,
      subject: subject,
      text: emailData.textEmail,
      html: emailData.HTMLEmail
  }
}

// Sends the email via the transport defined above
transporter.sendEmail = (toEmail, subject, emailData) => {
  let email = transporter.emailDetails(toEmail, subject, emailData)

  nodeTransporter.sendMail(email, (err, info) => {
      if(err) console.log('Error sending email: ', err)

      console.log('Email sent: ', info)
  })
}
