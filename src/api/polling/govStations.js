const govStations = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')
const stationIds = ['E3826', 'E3951', 'E3966']

govStations.config = {
  pollingDelay: 1000 * 60 * 60 * 12 // Every 12 hours in millis
}

govStations.fetchAndStore = async () => {
  await db.query(`TRUNCATE govStations`)

  for (station of stationIds) {
    let res

    try {
      res = await util.promisify(request.get)(`https://environment.data.gov.uk/flood-monitoring/id/stations/${station}`)
    } catch (e) {
      console.log(e) // need to do some handling to report api down or something
    }

    const json = JSON.parse(res.body)
    const item = json.items
    let row = []

    row.push(station)
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

    await db.query(`
      INSERT IGNORE into govStations (id, timestamp, riverName, eaAreaName, eaRegionName, description, longitude, latitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, row)
  }
}
