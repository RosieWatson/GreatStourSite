const govFloods = module.exports = {}
const request = require('request')
const util = require('util')
const db = ('../../lib/database.js')

govFloods.config = {
  pollingDelay: 15 * 1000
}

govFloods.fetchAndStore = async () => {
  let res
  try {
    // res = await util.promisify(request.get)('https://environment.data.gov.uk/flood-monitoring/data/readings?_view=full&latest&parameter=level')
  } catch (e) {
    console.log(e)
  }
  const json = require('./fakereq')

  json.items.forEach(item => {
    let row = []

    row.push(item['@id'].split('/').reverse()[1])
    row.push(item.dateTime)
    row.push(item.measure.parameter)
    row.push(item.measure.qualifier)
    row.push(item.measure.station['@id'].split('/').reverse()[0])
    row.push(item.measure.station.label)
    row.push(item.value)
    row.push(item.measure.unitName)
    row.push(item.measure.valueType)

    await db.query()

    console.log('row', row)
  })
}

;(() => {
  govFloods.fetchAndStore()
})()
