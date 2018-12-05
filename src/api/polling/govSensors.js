const govSensors = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')

govSensors.config = {
  pollingDelay: 60 * 15 * 1000
}

govSensors.fetchAndStore = async () => {
  let rawStationIds

  try {
    rawStationIds = await db.query(`SELECT notation FROM govStations;`, [])
  } catch (e) {
    console.log(e)
  }
  let stationIds = rawStationIds.map(o => o.notation)

  for (station of stationIds) {
    let res

    try {
      res = await util.promisify(request.get)(`https://environment.data.gov.uk/flood-monitoring/id/measures/${station}`)
    } catch (e) {
      console.log(e) // need to do some handling to report api down or something
    }

    const json = JSON.parse(res.body)
    const item = json.items
    let row = []

    row.push(item.stationReference)
    row.push(parseInt((Date.now() + '').slice(0,-3)))
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
    row.push((item.latestReading.dateTime).slice(0, -1))

    await db.query(`
      INSERT IGNORE into govSensors (id, timestamp, parameter, qualifier, stationId, stationLabel, value, unitName, valueType, latestReading)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, row)
  }
}
