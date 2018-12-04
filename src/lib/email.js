const Mailgen = require('mailgen')
 
const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Great Stour Site',
        link: 'localhost:8080'
    }
})

const welcomeEmail = {
  body: {
      name: 'Test Name',
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

const HTMLEmail = mailGenerator.generate(welcomeEmail)
const textEmail = mailGenerator.generatePlaintext(welcomeEmail) // To support people who don't allow HTML

require('fs').writeFileSync('preview.html', HTMLEmail, 'utf8') // Temporary to view the email
