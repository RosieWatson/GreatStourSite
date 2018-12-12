const mqtt = module.exports = {}
const mqttLib = require('mqtt')
const db = require('../lib/database.js')
const mqttMetadata = require('../lib/mqttMetadata.json')
const validation = require('../lib/validation.js')

const client  = mqttLib.connect(process.env.MQTT_HOST, {username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD})

// Connects to the MQTT client and subscribes to a topic
client.on('connect', () => {
  console.log('MQTT: connected')
  client.subscribe(process.env.MQTT_TOPIC)
})

// When a message is recieved it calls off to insert data into the DB
client.on('message', (topic, message) => {
  let newMessage = JSON.parse(message)
  mqtt.insertIntoDB(newMessage)
})

// Inserts data from the message into the DB
mqtt.insertIntoDB = async message => {
  if (!validation.hasTruthyProperties(message, ['metadata'])) return
  let row = []
  let waterHeight = mqtt.convertValue(message.dev_id, message.payload_raw)

  row.push(parseInt((Date.now() + '').slice(0,-3))) // Getting the current UNIX timestamp and removing milliseconds
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
    console.log('Failed to insert into mqttSensors DB: ', e)
  }
}

// Converts the MQTT value from base64 (mm) to decimal (m)
mqtt.convertValue = (sensor, value) => {
  let sensorMeta = mqttMetadata.metadata.filter(device => device.dev_id === sensor) // Finds the metadata for the required sensor
  let sensorDistance = sensorMeta[0].distance_sensor_from_river_bed
  let currentValue = Buffer.from(value, 'base64').readInt16BE(0) // Converts value from base64 to decimal

  return (sensorDistance - currentValue)/1000 // Returns the river height in meters
}

// Works out how full the river is as a percentage
mqtt.floodIndicator = (sensor, waterHeight) => {
  let sensorMeta = mqttMetadata.metadata.filter(device => device.dev_id === sensor) // Finds the metadata for the required sensor
  let riverDepth = ((sensorMeta[0].distance_flood_plain_from_river_bed) + (sensorMeta[0].distance_sensor_from_river_bed))/1000

  return waterHeight/riverDepth // Returns how full the river is as a percentage
}
