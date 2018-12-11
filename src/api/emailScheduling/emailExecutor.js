const emailExecutor = module.exports = {}
const emails = require('./emails')

// This starts the polling of the email sending script
emailExecutor.startAll = () => {
  Object.keys(emails).map(k => {
    pollers[k].checkAndDispatch()
    setInterval(pollers[k].checkAndDispatch, pollers[k].config.pollingDelay)
  })
}
