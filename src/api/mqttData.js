const app = require('../server.js')
const db = require('../lib/database.js')
const validation = require('../lib/validation.js')

// API endpoint to return all the latest MQTT sensor data
app.get('/api/mqttdata/fetch/sensors', async (req, res) => {
  let errors = []
  let result
  // Fetches data from the DB
  try {
    result = await db.query(`SELECT ms.deviceID, ms.deviceTime, ms2.longitude, ms2.latitude, ms2.value
                              FROM (
                                      SELECT deviceID, MAX(deviceTime) deviceTime
                                      FROM mqttSensors
                                      GROUP BY deviceID
                                    ) ms
                              JOIN mqttSensors ms2 ON (ms2.deviceTime = ms.deviceTime AND ms2.deviceID = ms.deviceID)
                              GROUP BY ms.deviceID, ms2.longitude, ms2.latitude, ms2.value;`)
  } catch (e) {
    console.log('Failed to fetch data from mqttSensors table', e)
    errors.push('FAILED_MQTTSENSORS_LOOKUP')
  }

  // Returns any errors or data from the DB query
  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})

// API endpoint to return all the latest MQTT flood data
app.get('/api/mqttdata/fetch/floods', async (req, res) => {
  let errors = []
  let result = null

  // Fetches data from the DB (where the flood percentage is more than 70%)
  try {
    result = await db.query(
      `SELECT ms.deviceID, ms.deviceTime, ms2.longitude, ms2.latitude, ms2.value, ms2.floodPercentage
        FROM (
                SELECT deviceID, MAX(deviceTime) deviceTime
                FROM mqttSensors
                GROUP BY deviceID
              ) ms
        JOIN mqttSensors ms2 ON (ms2.deviceTime = ms.deviceTime AND ms2.deviceID = ms.deviceID)
        WHERE ms2.floodPercentage > 0.69
        GROUP BY ms.deviceID, ms2.longitude, ms2.latitude, ms2.value, ms2.floodPercentage;
       `)
  } catch (e) {
    console.log('Failed to fetch data from mqttSensors table', e)
    errors.push('FAILED_MQTTSENSORS_LOOKUP')
  }

  // Returns any errors or data from the DB query
  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})

// API endpoint to return all the MQTT data for one sensor over a specified 30 day period
app.post('/api/mqttdata/fetch/last30days', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['date', 'stationID'])) return res.status(400).send('MISSING_PARAMETERS')
  let errors = []
  let result = null
  let currentDate = req.body.date

  // Fetches data from the DB
  try {
    result = await db.query(
      `SELECT AVG(value) as val, deviceTime as date FROM mqttSensors
        WHERE deviceID = ? AND deviceTime
        BETWEEN ? - INTERVAL 30 DAY AND ?
        GROUP BY DATE(deviceTime)
        ORDER BY DATE(deviceTime)`,
      [req.body.stationID, currentDate, currentDate]
    )
  } catch (e) {
    console.log('Failed to fetch data from mqttSensors table', e)
    errors.push('FAILED_MQTTSENSORS_LOOKUP')
  }

  // Returns any errors or data from the DB query
  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})

// API endpoint to return all the MQTT data for a specific day
app.post('/api/mqttdata/fetch/specificDate', async (req, res) => {
  if (!validation.hasTruthyProperties(req.body, ['date'])) return res.status(400).send('MISSING_PARAMETERS')
  let errors = []
  let result = null
  let requiredDate = (req.body.date) + '%' // Changes the date from dd/mm/yyyy to yyyy-mm-dd%

  // Fetches data from the DB
  try {
    result = await db.query(
      `SELECT deviceID, AVG(value) as val, longitude, latitude FROM mqttSensors mqS
        WHERE deviceTime LIKE ?
        GROUP BY deviceID`,
        [requiredDate])
  } catch (e) {
    console.log('Failed to fetch data from mqttSensors table', e)
    errors.push('FAILED_MQTTSENSORS_LOOKUP')
  }

  // Returns any errors or data from the DB query
  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})
