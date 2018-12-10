const app = require('../server.js')
const db = require('../lib/database.js')

withinRefreshCheck = async table => {
  let errors = []
  let result

  try {
    result = await db.query(`SELECT max(timestamp) AS oldestResult FROM ${table};`)
    if (new Date(result[0].oldestResult) > new Date(Date.now() - (60 * 15 * 1000))) return {
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

app.get('/api/govdata/fetch/floods', async (req, res) => {
  let errors = []
  let result = null
  try {
    result = await db.query(`SELECT * FROM govFloods;`, [])
  } catch (e) {
    console.log('Failed to fetch data from govFloods table', e)
    errors.push('FAILED_GOVFLOODS_LOOKUP')
  }

  const refreshQuotaCheck = await withinRefreshCheck('govFloods')
  return res.send({
    errors: [].concat(errors, refreshQuotaCheck.errors),
    data: result,
    withinRefreshQuota: refreshQuotaCheck.data
  })
})

app.get('/api/govdata/fetch/sensors', async (req, res) => {
  let errors = []
  let result = null
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

  const refreshQuotaCheck = await withinRefreshCheck('govSensors')
  return res.send({
    errors: [].concat(errors, refreshQuotaCheck.errors),
    data: result,
    withinRefreshQuota: refreshQuotaCheck.data
  })
})

app.post('/api/govdata/fetch/last30days', async (req, res) => {
  let errors = []
  let result = null
  let currentDate = req.body.date + ' 23:59:59'

  try {
    result = await db.query(
      `SELECT * FROM riverData.govSensors WHERE id = ? AND latestReading BETWEEN ? - INTERVAL 30 DAY AND ?`,
      [req.body.stationID, currentDate, currentDate]
    )
  } catch (e) {
    console.log('Failed to fetch data from govSensors table', e)
    errors.push('FAILED_GOVSENSORS_LOOKUP')
  }

  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})

app.post('/api/govdata/fetch/specificDate', async (req, res) => {
  let errors = []
  let result = null

  try {
    result = await db.query(
      `SELECT * FROM riverData.govSensors gSens
        WHERE latestReading LIKE '2018-12-07%'
        AND timestamp = (SELECT MAX(gSens2.timestamp) FROM riverData.govSensors gSens2 WHERE gSens2.id = gSens.id);`,
        [req.body.date])
  } catch (e) {
    console.log('Failed to fetch data from govSensors table', e)
    errors.push('FAILED_GOVSENSORS_LOOKUP')
  }

  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})
