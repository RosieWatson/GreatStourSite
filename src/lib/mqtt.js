const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://eu.thethings.network', {username: 'kentwatersensors', password: 'ttn-account-v2.7j6Z9OduNwFW7il2Sd28YYF4Q-8l9rDDPaNRFw06-GM'})
const subTopic = 'kentwatersensors/devices/+/up'

client.on('connect', () => {
  console.log('conected')
  client.subscribe(subTopic)
})

client.on('message', (topic, message) => {
  console.log(topic.toString())
  console.log(message.toString())
})
