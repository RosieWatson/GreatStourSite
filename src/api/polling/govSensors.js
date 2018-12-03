const govFloods = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')
// const stationIds = ['E3826', 'E3951', 'E3966']
const stationIds = ['E3826-level-stage-i-15_min-mAOD', 'E3951-level-stage-i-15_min-mASD', 'E3966-level-stage-i-15_min-mASD']

govFloods.config = {
  pollingDelay: 15 * 1000
}

govFloods.fetchAndStore = async () => {
  for (station of stationIds) {
    let res

    try {
      // res = await util.promisify(request.get)(`https://environment.data.gov.uk/flood-monitoring/id/stations/${station}/readings?latest`)
      res = await util.promisify(request.get)(`https://environment.data.gov.uk/flood-monitoring/id/measures/${station}`)
    } catch (e) {
      console.log(e) // need to do some handling to report api down or something
    }

    const json = JSON.parse(res.body)
    console.log('My JSON: ', json)
    const item = json.items
    let row = []

    row.push(station)
    row.push((item.latestReading.dateTime).slice(0, -1))
    row.push(item.parameter)
    row.push(item.qualifier)
    row.push(item.station.split('/').reverse()[0])
    let label = item.label
    if (Array.isArray(label)) {
      row.push(label.join(', '))
    } else {
      row.push(label)
    }
    row.push(item.latestReading.value)
    row.push(item.unitName)
    row.push(item.valueType)
    console.log('My row: ', row)
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
