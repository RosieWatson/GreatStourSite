// const mqtt = require('mqtt')


// mqtt.convertValue = value => {
//   return Buffer.from(value, 'base64').readInt16BE(0)
// }

// client.on('connect', () => {
//   console.log('conected')
//   client.subscribe(subTopic)
// })

// client.on('message', (topic, message) => {
//   let newMessage = JSON.parse(message)

//   console.log(message.toString())
//   console.log(mqtt.convertValue(newMessage.payload_raw))
// })
