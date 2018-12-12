const backfill = module.exports = {}
const request = require('request')
const util = require('util')

const db = require('../lib/database.js')
const govStations = require('../api/polling/govStations.js')
const mqtt = require('../lib/mqtt.js')

// MQTT sensor metadata
const mqttMetadta = {
  lairdc0ee400001012345: {
    latitude: 51.281,
    longitude: 1.0742298
  },
  lairdc0ee4000010109f3: {
    latitude: 51.279247,
    longitude: 1.0776373
  },
  lairdc0ee4000010109e2: {
    latitude: 51.276146,
    longitude: 1.069391
  }
}

backfill.MQTTData = async () => {
  let res
  try {
    res = await util.promisify(request.get)({
      headers: {
        Authorization: process.env.MQTT_PASSWORD || 'key ttn-account-v2.mRzaS7HOchwKsQxdj1zD-KwjxXAptb7s9pca78Nv7_U'
      },
      uri: 'https://kentwatersensors.data.thethingsnetwork.org/api/v2/query?last=7d' // change to 7 day when finished
    })
  } catch (e) {
    console.log(e)
    return
  }
  const json = JSON.parse(res.body)

  for (j of json) {
    let row = []
    let waterHeight = mqtt.convertValue(j.device_id, j.raw)

    row.push(parseInt((Date.now() + '').slice(0,-3)))
    row.push(j.device_id)
    row.push(waterHeight)
    row.push(mqttMetadta[j.device_id].longitude)
    row.push(mqttMetadta[j.device_id].latitude)
    row.push(j.time)
    row.push(mqtt.floodIndicator(j.device_id, waterHeight))

    try {
      await db.query(`
      INSERT IGNORE into mqttSensors (timestamp, deviceID, value, longitude, latitude, deviceTime, floodPercentage)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, row)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('MQTT backfill complete')
}

backfill.govData = async () => {
  try {
    await govStations.fetchAndStore()
  } catch (e) {
    console.log(e)
    return
  }

  await new Promise((resolve, reject) => {
    setTimeout(resolve, 10000)
  })

  try {
    rawStationIDs = await db.query(`SELECT notation FROM govStations;`, [])
  } catch (e) {
    console.log(e)
    return
  }
  let stationIDs = rawStationIDs.map(o => o.notation)
  for (station of stationIDs) {
    let res

    try {
      res = await util.promisify(request.get)(`https://environment.data.gov.uk/flood-monitoring/id/measures/${station}/readings`)
    } catch (e) {
      console.log(e) // need to do some handling to report api down or something
    }

    const json = JSON.parse(res.body)
    const stationJSON = json.items

    for (item of stationJSON) {
      let row = []

      row.push(station.split('-')[0])
      row.push(parseInt((Date.now() + '').slice(0,-3)))
      row.push('level')
      if (station.includes('tidal')){
        row.push('Tidal Level')
      } else {
        row.push('Stage')
      }
      row.push(station)
      row.push(null)
      row.push(item.value)
      if (station.includes('tidal')){
        row.push('mASD')
      } else {
        row.push('mAOD')
      }
      row.push('instantaneous')
      row.push((item.dateTime).slice(0, -1))

      try {
        await db.query(`
          INSERT IGNORE into govSensors (id, timestamp, parameter, qualifier, stationId, stationLabel, value, unitName, valueType, latestReading)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, row)
      } catch (e) {
        console.log('Couldn\'t insert values into govSensors DB: ', e)
      }
    }
  }

  console.log('Gov data backfill complete')
}

;(() => {
  backfill.MQTTData()
  backfill.govData()
})()
