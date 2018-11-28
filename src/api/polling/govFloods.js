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
    res = await util.promisify(request.get)('https://environment.data.gov.uk/flood-monitoring/id/floods')
  } catch (e) {
    console.log(e)
    return
  }
  const json = JSON.parse(res.body)
  for (i of json.items) {
    let row = []
    row.push(i['@id'].split('/').reverse()[0])
    row.push(Date.now())
    row.push(i.floodArea.riverOrSea)
    row.push(i.eaAreaName)
    row.push(i.eaRegionName)
    row.push(JSON.stringify(i.floodArea.county.split('').join('')))
    row.push(i.description)

    await db.query(`
      INSERT into govFloods (id, timestamp, waterbody, eaAreaName, eaRegionName, counties, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, row)
    console.log('didit')
    process.exit(0)
  }
}

;(() => {
  govFloods.fetchAndStore()
})()
