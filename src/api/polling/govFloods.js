const govFloods = module.exports = {}
const request = require('request')
const util = require('util')

govFloods.config = {
  pollingDelay: 15 * 1000
}

govFloods.fetchAndStore = async () => {
  let res
  try {
    res = await util.promisify(request.get)('https://environment.data.gov.uk/flood-monitoring/id/floods')
  } catch (e) {
    console.log(e)
  }
  const json = JSON.parse(res.body)
  console.log(json.meta)
}

;(() => {
  govFloods.fetchAndStore()
})()
