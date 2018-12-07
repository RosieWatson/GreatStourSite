const generator = module.exports = {}
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

  let HTMLEmail = mailGenerator.generate(email)
  let textEmail = mailGenerator.generatePlaintext(email) // To support people who don't allow HTML

  return { HTMLEmail, textEmail }
}

generator.createFloodAlertEmail = (subscriber, floods) => {
  let email = {
    body: {
      name: subscriber.name,
      intro: [].concat(['We have detected flood warning(s) in your area! Please see the list below:'],
                        generator.formatFloodList(floods)),
      outro: 'Run away before you drown... (link to website and tell them to go there for more live info)'
    }
  }

  let HTMLEmail = mailGenerator.generate(email)
  let textEmail = mailGenerator.generatePlaintext(email)

  return { HTMLEmail, textEmail }
}

// Quick hacked version, just lists the rivers that might flood, needs severity and more info
generator.formatFloodList = (floods) => {
  return floods.map(f => f.description)
}
