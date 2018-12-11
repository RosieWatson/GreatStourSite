const generator = module.exports = {}
const Mailgen = require('mailgen')

// Setting up mailgen configuration
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
      name: 'Great Stour Site',
      link: 'localhost:8080'
  }
})

// Generates the welcome email used when a user subscribes
generator.createWelcomeEmail = name => {
  let email = {
    body: {
      name,
      intro: 'Thank you for signing up to Great Stour flood alerts.',
      action: {
          instructions: 'In the mean time, if you would like to see any information on current (or historic water level), please visit:',
          button: {
              color: '#012040', // Optional action button color
              text: 'Our Website',
              link: 'http://localhost:8080'
          }
      },
      outro: 'Thanks again!'
    }
  }

  let HTMLEmail = mailGenerator.generate(email)
  let textEmail = mailGenerator.generatePlaintext(email) // To support people who don't allow HTML

  return { HTMLEmail, textEmail }
}

// Generates the flood alerts email to send to subscribers with a table of flood information
generator.createFloodAlertEmail = (subscriber, floods) => {
  let tableData = generator.formatFloodList(floods)

  let email = {
    body: {
      name: subscriber.name,
      intro: 'We have detected flood warning(s) in your area! Please see the list below:',
      table: {
        data: tableData,
        columns: {
            customWidth: {
                river: '30%',
                severity: '30%'
            }
        }
      },
      action: {
        instructions: 'For more information, please visit:',
        button: {
            color: '#012040', // Optional action button color
            text: 'Our Website',
            link: 'http://localhost:8080'
        }
      },
      outro: 'Thanks again!'
    }
  }

  let HTMLEmail = mailGenerator.generate(email)
  let textEmail = mailGenerator.generatePlaintext(email) // To support people who don't allow HTML

  return { HTMLEmail, textEmail }
}

// Returns information about each flood to be used in the email
generator.formatFloodList = (floods) => {
  return floods.map(f => {return { "river": f.waterbody, "severity": f.severity, "message": f.message }})
}
