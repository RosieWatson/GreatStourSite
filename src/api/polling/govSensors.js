const govFloods = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')

govFloods.config = {
  pollingDelay: 15 * 1000
}

govFloods.fetchAndStore = async () => {
  let res
  try {
    res = await util.promisify(request.get)('https://environment.data.gov.uk/flood-monitoring/data/readings?_view=full&latest&parameter=level')
  } catch (e) {
    console.log(e)
  }
  const json = JSON.parse(res.body)

  for (item of json.items) {
    let row = []

    row.push(item['@id'].split('/').reverse()[1])
    row.push((item.dateTime).slice(0, -1))
    row.push(item.measure.parameter)
    row.push(item.measure.qualifier)
    row.push(item.measure.station['@id'].split('/').reverse()[0])
    let label = item.measure.station.label
    if (Array.isArray(label)) {
      row.push(label.join(', '))
    } else {
      row.push(label)
    }
    row.push(item.value)
    row.push(item.measure.unitName)
    row.push(item.measure.valueType)

    await db.query(`
      INSERT into govSensors (id, timestamp, parameter, qualifier, stationId, stationLabel, value, unitName, valueType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, row)
  }
  process.exit(0)
}

(() => {
  govFloods.fetchAndStore()
})()
