const govStations = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')
const validation = require('../../lib/validation.js')

govStations.config = {
  pollingDelay: 60 * 15 * 1000 // Polling delay of 15 minutes
}

// Function that calls off to get the stations we want to poll from the government API
govStations.fetchAndStore = async () => {
  let res
  // Calls off to the government API
  try {
    res = await util.promisify(request.get)(`https://environment.data.gov.uk/flood-monitoring/id/stations?riverName=Great+Stour`)
  } catch (e) {
    console.log('Failed on gov API call', e)
    return
  }

  try {
    await db.query(`TRUNCATE govStations;`) // Clears DB of old data before inserting new
  } catch (e) {
    console.log('Failed to truncate govStations table', e)
  }

  const json = JSON.parse(res.body)

  // For each item in the JSON,we insert the data into a row in the DB
  for (item of json.items) {
    if (!validation.hasTruthyProperties(i, ['measures', 'status'])) continue

    let row = []

    row.push(item.stationReference)
    row.push(parseInt((Date.now() + '').slice(0,-3))) // Getting the current UNIX timestamp and removing milliseconds
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
    row.push(item.measures[0]['@id'].split('/').reverse()[0]) // Gets the last value from the URL to make API calls later
    row.push(item['status'].split('/').reverse()[0]) // gets the status off the end of a URL

    // Trys to insert data into the govStations DB
    try {
      await db.query(`
        INSERT IGNORE into govStations (id, timestamp, riverName, eaAreaName, eaRegionName, description, longitude, latitude, notation, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, row)
    } catch (e) {
      console.log('Couldn\'t insert values into govStations DB: ', e)
    }
  }
}
