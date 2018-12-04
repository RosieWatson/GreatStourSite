const pollExecutor = module.exports = {}
const pollers = require('./polling')

pollExecutor.startAll = () => {
  Object.keys(pollers).map(k => {
    pollers[k].fetchAndStore()
    setInterval(pollers[k].fetchAndStore, pollers[k].config.pollingDelay)
  })
}
