const app = require('../server.js')
const db = require('../lib/database.js')

app.get('/api/mqttdata/fetch/sensors', async (req, res) => {
  let errors = []
  let result

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

  return res.send({
    erros,
    data: result,
    withinRefreshQuota: null
  })
})

app.get('/api/mqttdata/fetch/floods', async (req, res) => {
  let errors = []
  let result = null
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

  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})

app.post('/api/mqttdata/fetch/last30days', async (req, res) => {
  let errors = []
  let result = null
  let currentDate = (req.body.date).split('/').reverse().join('-')

  try {
    result = await db.query(
      `SELECT AVG(value) as val, deviceTime as date  FROM mqttSensors WHERE deviceID = ? AND deviceTime BETWEEN ? - INTERVAL 30 DAY AND ? GROUP BY DATE(deviceTime)`,
      [req.body.sensorID, currentDate, currentDate]
    )
  } catch (e) {
    console.log('Failed to fetch data from mqttSensors table', e)
    errors.push('FAILED_MQTTSENSORS_LOOKUP')
  }

  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})

app.post('/api/mqttdata/fetch/specificDate', async (req, res) => {
  let errors = []
  let result = null
  let requiredDate = (req.body.date).split('/').reverse().join('-') + '%'

  try {
    result = await db.query(
      `SELECT * FROM mqttSensors mqS
        WHERE deviceTime LIKE ?
        AND timestamp = (SELECT MAX(mqS2.timestamp) FROM mqttSensors mqS2 WHERE mqS2.id = mqS.id)`,
        [requiredDate])
  } catch (e) {
    console.log('Failed to fetch data from mqttSensors table', e)
    errors.push('FAILED_MQTTSENSORS_LOOKUP')
  }

  return res.send({
    errors,
    data: result,
    withinRefreshQuota: null
  })
})
