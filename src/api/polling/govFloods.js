const govFloods = module.exports = {}
const request = require('request')
const util = require('util')
const db = require('../../lib/database.js')

govFloods.config = {
  pollingDelay: 60 * 15 * 1000 // Polling delay of 15 minutes
}

// Function that calls off to get flood data from the government API
govFloods.fetchAndStore = async () => {
  await db.query(`TRUNCATE govFloods;`)

  let res
  try {
    res = await util.promisify(request.get)('https://environment.data.gov.uk/flood-monitoring/id/floods')
  } catch (e) {
    console.log(e)
    return
  }
  const json = JSON.parse(res.body)

  // For each item returned in the JSON we insert the data into a row in the DB
  for (i of json.items) {
    let row = []
    row.push(i['@id'].split('/').reverse()[0])
    row.push(parseInt((Date.now() + '').slice(0,-3)))
    row.push(i.floodArea.riverOrSea)
    row.push(i.eaAreaName)
    row.push(i.eaRegionName)
    row.push('[' + i.floodArea.county.split(',').map(c => '"' + c.trim() + '"').join(',') + ']')
    row.push(i.description)
    row.push(i.message)
    row.push(i.severity)
    row.push(i.severityLevel)

    try {
      await db.query(`
      INSERT IGNORE into govFloods (id, timestamp, waterbody, eaAreaName, eaRegionName, counties, description, message, severity, severityLevel)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, row)
    } catch (e) {
      console.log('Couldn\'t insert values into govFloods DB: ', e)
    }
  }
}
