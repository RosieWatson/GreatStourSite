require('datejs')
const app = require('../server.js')
const db = require('../lib/database.js')

// Function to check how fresh the data returned from a DB query is
withinRefreshCheck = async table => {
  let errors = []
  let result

  // Looks at the timestamps in the DB to see if it was within the last 20 minutes
  try {
    result = await db.query(`SELECT max(timestamp) AS oldestResult FROM ${table};`)
    if (new Date(result[0].oldestResult) > new Date.today().addMinutes(-20)) return {
      errors,
      data: true
    }
  } catch (e) {
    console.log('Error occurred during refresh quota timecheck')
    errors.push('FAILED_REFRESH_QUOTA_CHECK')
  } finally {
    return {
      errors,
      data: false
    }
  }
}

// API endpoint to return all the latest gov sensor data
app.get('/api/govdata/fetch/floods', async (req, res) => {
  let errors = []
  let result = null

  // Fetches data from the DB
  try {
    result = await db.query(`SELECT * FROM govFloods;`, [])
  } catch (e) {
    console.log('Failed to fetch data from govFloods table', e)
    errors.push('FAILED_GOVFLOODS_LOOKUP')
  }

  // Calls of to check how fresh the data is in the DB
  const refreshQuotaCheck = await withinRefreshCheck('govFloods')

  // Returns any errors or data from the DB query
  return res.send({
    errors: [].concat(errors, refreshQuotaCheck.errors),
    data: result,
    withinRefreshQuota: refreshQuotaCheck.data
  })
})

// API endpoint to return all the latest gov flood data
app.get('/api/govdata/fetch/sensors', async (req, res) => {
  let errors = []
  let result = null

  // Fetches data from the DB
  try {
    result = await db.query(
      `SELECT gSens.*, gStat.latitude, gStat.longitude, gStat.description FROM govSensors gSens
        JOIN govStations gStat ON gSens.id = gStat.id
        WHERE gSens.timestamp = (SELECT MAX(gSens2.timestamp) FROM govSensors gSens2 WHERE gSens2.id = gSens.id)
       `)
  } catch (e) {
    console.log('Failed to fetch data from govFloods table', e)
    errors.push('FAILED_GOVSENSORS_LOOKUP')
  }

  // Calls of to check how fresh the data is in the DB
  const refreshQuotaCheck = await withinRefreshCheck('govSensors')

  // Returns any errors or data from the DB query
  return res.send({
    errors: [].concat(errors, refreshQuotaCheck.errors),
    data: result,
    withinRefreshQuota: refreshQuotaCheck.data
  })
})

// API endpoint to return all the latest gov sensor data for one sensor over a specified 30 day period
app.post('/api/govdata/fetch/last30days', async (req, res) => {
  let errors = []
  let result
  let currentDate = (req.body.date).split('/').reverse().join('')

  // Fetches data from the DB
  try {
    result = await db.query(
      `SELECT AVG(value) as val, latestReading as date FROM govSensors WHERE id = ? AND latestReading BETWEEN ? - INTERVAL 30 DAY AND ? GROUP BY DATE(latestReading)`,
      [req.body.stationID, currentDate, currentDate]
    )
  } catch (e) {
    console.log('Failed to fetch data from govSensors table', e)
    errors.push('FAILED_GOVSENSORS_LOOKUP')
  }

  // Returns any errors or data from the DB query
  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})

// API endpoint to return all the gov data for a specific day
app.post('/api/govdata/fetch/specificDate', async (req, res) => {
  let errors = []
  let result = null
  let requiredDate = (req.body.date).split('/').reverse().join('-') + '%'

  // Fetches data from the DB
  try {
    result = await db.query(
      `SELECT id, AVG(value) as val FROM govSensors gSens
        WHERE latestReading LIKE ?
        GROUP BY id`,
        [requiredDate])
  } catch (e) {
    console.log('Failed to fetch data from govSensors table', e)
    errors.push('FAILED_GOVSENSORS_LOOKUP')
  }

   // Returns any errors or data from the DB query
  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})
