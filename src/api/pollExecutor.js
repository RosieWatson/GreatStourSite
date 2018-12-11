const pollExecutor = module.exports = {}
const pollers = require('./polling')

// This starts all of the polling scripts run on the government API
pollExecutor.startAll = () => {
  Object.keys(pollers).map(k => {
    pollers[k].fetchAndStore()
    setInterval(pollers[k].fetchAndStore, pollers[k].config.pollingDelay)
  })
}
