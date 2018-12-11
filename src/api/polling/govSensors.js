const govSensors = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')

govSensors.config = {
  pollingDelay: 60 * 15 * 1000 // Polling delay of 15 minutes
}

// Function that calls off to get sensor data from the government API
govSensors.fetchAndStore = async () => {
  let rawStationIds, res

  // DB call to get the stations we want to get data from
  try {
    rawStationIds = await db.query(`SELECT id FROM govStations;`, [])
  } catch (e) {
    console.log(e)
  }
  let stationIds = rawStationIds.map(o => o.id)

  // API call to return all the latest sensor data for water levels
  try {
    res = await util.promisify(request.get)('https://environment.data.gov.uk/flood-monitoring/data/readings?_view=full&latest&parameter=level')
  } catch (e) {
    console.log(e) // need to do some handling to report api down or something
  }
  const json = JSON.parse(res.body)

  // For each item in the JSON, returned that matches our station list, we insert the data into a row in the DB
  for (item of json.items) {
    if (!stationIds.includes(item.measure.stationReference)) continue
    let row = []

    row.push(item.measure.stationReference)
    row.push(parseInt((Date.now() + '').slice(0,-3)))
    row.push(item.measure.parameter)
    row.push(item.measure.qualifier)
    row.push(item.measure['@id'].split('/').reverse()[0])
    let label = item.measure.station.label
    if (Array.isArray(label)) {
      row.push(label.join(', '))
    } else {
      row.push(label)
    }
    row.push(item.value)
    row.push(item.measure.unitName)
    row.push(item.measure.valueType)
    row.push((item.dateTime).slice(0, -1))

    try {
      await db.query(`
        INSERT IGNORE into govSensors (id, timestamp, parameter, qualifier, stationId, stationLabel, value, unitName, valueType, latestReading)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, row)
    } catch (e) {
      console.log('Couldn\'t insert values into govSensors DB: ', e)
    }
  }
}
