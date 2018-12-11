const govFloods = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')
const validation = require('../../lib/validation.js')

govFloods.config = {
  pollingDelay: 60 * 15 * 1000 // Polling delay of 15 minutes
}

// Function that calls off to get flood data from the government API
govFloods.fetchAndStore = async () => {
  let res
  // Calls off to the government API 
  try {
    res = await util.promisify(request.get)('https://environment.data.gov.uk/flood-monitoring/id/floods')
  } catch (e) {
    console.log('Failed on gov API call', e)
    return
  }

  // Clears out DB before insert
  try {
    await db.query(`TRUNCATE govFloods;`)
  } catch(e) {
    console.log('Failed to truncate govFloods table', e)
  }

  const json = JSON.parse(res.body)

  // For each item returned in the JSON we insert the data into a row in the DB
  for (i of json.items) {
  if (!validation.hasTruthyProperties(i, ['@id', 'floodArea'])) continue

    let row = []
    row.push(i['@id'].split('/').reverse()[0]) // Gets the ID of the station from the end of a URL
    row.push(parseInt((Date.now() + '').slice(0,-3))) // Getting the current UNIX timestamp and removing milliseconds
    row.push(i.floodArea.riverOrSea)
    row.push(i.eaAreaName)
    row.push(i.eaRegionName)
    row.push('[' + i.floodArea.county.split(',').map(c => '"' + c.trim() + '"').join(',') + ']') // Gets the counties and puts them into a string array
    row.push(i.description)
    row.push(i.message)
    row.push(i.severity)
    row.push(i.severityLevel)

    // Tries to enter a row into the govFloods DB
    try {
      await db.query(`
      INSERT IGNORE into govFloods (id, timestamp, waterbody, eaAreaName, eaRegionName, counties, description, message, severity, severityLevel)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, row)
    } catch (e) {
      console.log('Couldn\'t insert values into govFloods DB:', e)
    }
  }
}
