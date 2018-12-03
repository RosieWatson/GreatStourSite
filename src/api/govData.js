const app = require('../server.js')
const db = require('../lib/database.js')

app.get('/api/govdata/fetch/floods', async (req, res) => {
  let result
  try {
    result = await db.query(`SELECT * FROM govFloods;`, [])
  } catch (e) {
    console.log('Error during FLOODS FETCH')
    console.log(e)
  }
  console.log('Result')
  console.log(result)
  return res.send(result)
 })

app.get('/api/govdata/fetch/sensors', async (req, res) => {
  let result
  try {
    result = await db.query(`SELECT * FROM govSensors gSens JOIN govStations gStat ON gSens.id = gStat.id`)
  } catch (e) {
    console.log('ERROR DURING SENSORS FETCH')
    console.log(e)
  }
  console.log('Result')
  console.log(result)
  return res.send(result)
})
