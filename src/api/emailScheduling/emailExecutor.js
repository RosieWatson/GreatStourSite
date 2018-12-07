const emailExecutor = module.exports = {}
const emails = require('./emails')

emailExecutor.startAll = () => {
  Object.keys(emails).map(k => {
    pollers[k].checkAndDispatch()
    setInterval(pollers[k].checkAndDispatch, pollers[k].config.pollingDelay)
  })
}
