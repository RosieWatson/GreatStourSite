const app = require('../server.js')
const db = require('../lib/database.js')

app.get('/api/mqttdata/fetch/sensors', async (req, res) => {
  let result

  try {
    result = await db.query(`
                              SELECT * FROM riverData.mqttSensors ms
                              WHERE ms.timestamp = (SELECT MAX(ms2.timestamp)
                                                      FROM riverData.mqttSensors ms2
                                                      WHERE ms2.deviceID = ms.deviceID)
                            `)
  } catch (e) {
    console.log(e) // Need to handle properly
  }

  return res.send({
    data: result,
    withinRefreshQuota: null
  })
})
