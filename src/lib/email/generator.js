const Mailgen = require('mailgen')

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
      name: 'Great Stour Site',
      link: 'localhost:8080'
  }
})

generator.createWelcomeEmail = name => {
  let email = {
    body: {
      name: name,
      intro: 'Thank you for signing up to Great Stour flood alerts.',
      action: {
        instructions: 'In the mean time, if you would like to see any information on current (or historic water level), please visit:',
        button: {
            color: '#22BC66',
            text: 'Our website',
            link: 'localhost:8080'
        }
      },
    }
  }

  let HTMLEmail = mailGenerator.generate(email.createWelcomeEmail())
  let textEmail = mailGenerator.generatePlaintext(email.createWelcomeEmail()) // To support people who don't allow HTML

  return { HTMLEmail, textEmail }
}
