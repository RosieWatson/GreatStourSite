const nodemailer = require('nodemailer')
const senderAccount = 'placeholder@gmail.com'
const senderPassword = 'placeholderpassword'

const nodeTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: senderAccount,
      pass: senderPassword
  }
})

transporter.emailDetails = (toEmail, subject, data) => {
  return {
      from: senderAccount,
      to: toEmail,
      subject: subject,
      text: data.textEmail,
      html: data.HTMLEmail
  }
}

transporter.sendEmail = emailData => {
  nodeTransporter.sendMail(emailData, (err, info) => {
      if(err) console.log(err)
      
      console.log(info)
  })
}
