const govStations = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')

govStations.config = {
  pollingDelay: 1000 * 60 * 60 * 12 // Every 12 hours in milliseconds
}

// Function that calls off to get the stations we want to poll from the government API
govStations.fetchAndStore = async () => {
  let res
  try {
    res = await util.promisify(request.get)(`https://environment.data.gov.uk/flood-monitoring/id/stations?riverName=Great+Stour`)
  } catch (e) {
    console.log(e) // need to do some handling to report api down or something
  }

  await db.query(`TRUNCATE govStations;`) // Clears DB of old data before inserting new

  const json = JSON.parse(res.body)

  // For each item in the JSON,we insert the data into a row in the DB
  for (item of json.items) {
    if (!item.measures) continue

    let row = []

    row.push(item.stationReference)
    row.push(parseInt((Date.now() + '').slice(0,-3)))
    row.push(item.riverName)
    row.push(item.eaAreaName)
    row.push(item.eaRegionName)
    let label = item.label
    if (Array.isArray(label)) {
      row.push(label.join(', '))
    } else {
      row.push(label)
    }
    row.push(item.long)
    row.push(item.lat)
    row.push(item.measures[0]['@id'].split('/').reverse()[0])
    row.push(item['status'].split('/').reverse()[0])

    await db.query(`
      INSERT IGNORE into govStations (id, timestamp, riverName, eaAreaName, eaRegionName, description, longitude, latitude, notation, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, row)
  }
}
