const mqtt = require('mqtt')
const db = require('../lib/database.js')
const mqttMetadata = require('../lib/mqttMetadata.json')

const client  = mqtt.connect('mqtt://eu.thethings.network', {username: "kentwatersensors", password: "[password]"})
const subTopic = 'kentwatersensors/devices/+/up'

client.on('connect', () => {
  console.log('MQTT: connected')
  client.subscribe(subTopic)
})

client.on('message', (topic, message) => {
  let newMessage = JSON.parse(message)
  mqtt.insertIntoDB(newMessage)
})

mqtt.insertIntoDB = async message => {
  let row = []
  let waterHeight = mqtt.convertValue(message.dev_id, message.payload_raw)

  row.push(parseInt((Date.now() + '').slice(0,-3)))
  row.push(message.dev_id)
  row.push(waterHeight)
  row.push(message.metadata.longitude)
  row.push(message.metadata.latitude)
  row.push(message.metadata.time)
  row.push(mqtt.floodIndicator(message.dev_id, waterHeight))

  try {
    await db.query(`
    INSERT IGNORE into mqttSensors (timestamp, deviceID, value, longitude, latitude, deviceTime, floodPercentage)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, row)
  } catch (e) {
    console.log(e)
  }
}

mqtt.convertValue = (sensor, value) => {
  let sensorMeta = mqttMetadata.metadata.filter(device => device.dev_id === sensor)
  let sensorDistance = sensorMeta[0].distance_sensor_from_river_bed
  let currentValue = Buffer.from(value, 'base64').readInt16BE(0)

  return (sensorDistance - currentValue)/100
}

mqtt.floodIndicator = (sensor, waterHeight) => {
  let sensorMeta = mqttMetadata.metadata.filter(device => device.dev_id === sensor)
  let riverDepth = ((sensorMeta[0].distance_flood_plain_from_river_bed) + (sensorMeta[0].distance_sensor_from_river_bed))/100

  return waterHeight/riverDepth
}
