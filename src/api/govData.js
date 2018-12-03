const app = require('../server.js')
const db = require('../lib/database.js')

withinRefreshCheck = async table => {
  let result

  try {
    result = await db.query(`SELECT max(timestamp) AS oldestResult FROM ${table};`)
    if(new Date(result[0].oldestResult) > new Date(Date.now() - (60 * 15 * 1000))) return true
    return false
  } catch (e) {
    console.log('Error during time check')
    console.log(e) // Need to handle properly
  }
}

app.get('/api/govdata/fetch/floods', async (req, res) => {
  let result

  try {
    result = await db.query(`SELECT * FROM govFloods;`, [])
  } catch (e) {
    console.log('Error during FLOODS FETCH')
    console.log(e) // Need to handle properly
  }

  let withinRefreshQuota = await withinRefreshCheck('govFloods')

  return res.send({
    data: result,
    withinRefreshQuota
  })
 })

app.get('/api/govdata/fetch/sensors', async (req, res) => {
  let result

  try {
    result = await db.query(`SELECT * FROM govSensors gSens JOIN govStations gStat ON gSens.id = gStat.id`)
  } catch (e) {
    console.log('ERROR DURING SENSORS FETCH')
    console.log(e) // Need to handle properly
  }

  let withinRefreshQuota = await withinRefreshCheck('govSensors')

  return res.send({
    data: result,
    withinRefreshQuota
  })
})
