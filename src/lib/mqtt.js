const mqtt = require('mqtt')
const db = require('../lib/database.js')
//missing credentials

client.on('connect', () => {
  console.log('conected')
  client.subscribe(subTopic)
})

client.on('message', (topic, message) => {
  console.log('here')
  let newMessage = JSON.parse(message)
  mqtt.insertIntoDB(newMessage)
})

mqtt.insertIntoDB = async message => {
  let row = []
  console.log('and here')

  row.push(parseInt((Date.now() + '').slice(0,-3)))
  row.push(message.dev_id)
  row.push(mqtt.convertValue(message.payload_raw))
  row.push(message.metadata.longitude)
  row.push(message.metadata.latitude)
  row.push(message.metadata.time)

  await db.query(`
      INSERT IGNORE into mqttSensors (timestamp, deviceID, value, longitude, latitude, deviceTime)
      VALUES (?, ?, ?, ?, ?, ?)
    `, row)
}

mqtt.convertValue = value => {
  return Buffer.from(value, 'base64').readInt16BE(0)
}
