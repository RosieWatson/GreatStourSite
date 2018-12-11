const app = require('../server.js')
const db = require('../lib/database.js')

// API endpoint to return all the latest MQTT sensor data
app.get('/api/mqttdata/fetch/sensors', async (req, res) => {
  let errors = []
  let result

  // Fetches data from the DB
  try {
    result = await db.query(`
                              SELECT * FROM mqttSensors ms
                              WHERE ms.timestamp = (SELECT MAX(ms2.timestamp)
                                                      FROM mqttSensors ms2
                                                      WHERE ms2.deviceID = ms.deviceID)
                            `)
  } catch (e) {
    console.log('Failed to fetch data from mqttSensors table', e)
    errors.push('FAILED_MQTTSENSORS_LOOKUP')
  }

  // Returns any errors or data from the DB query
  return res.send({
    erros,
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
      `SELECT * FROM mqttSensors mqS
        WHERE mqS.timestamp = (SELECT MAX(mqS2.timestamp) FROM mqttSensors mqS2 WHERE mqS2.deviceID = mqS.deviceID)
        AND floodPercentage > 0.69
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
  let errors = []
  let result = null
  let currentDate = (req.body.date).split('/').reverse().join('-')

  // Fetches data from the DB
  try {
    result = await db.query(
      `SELECT AVG(value) as val, deviceTime as date FROM mqttSensors WHERE deviceID = ? AND deviceTime BETWEEN ? - INTERVAL 30 DAY AND ? GROUP BY DATE(deviceTime)`,
      [req.body.sensorID, currentDate, currentDate]
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
  let errors = []
  let result = null
  let requiredDate = (req.body.date).split('/').reverse().join('-') + '%'

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
