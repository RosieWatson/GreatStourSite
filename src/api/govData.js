const app = require('../server.js')
const database = require('../lib/database.js')

app.get('/api/govdata/fetch/floods', async (req, res) => {
  // SELECT * FROM govFloods WHERE waterbody = 'Great Stour';
})

app.get('/api/govdata/fetch/sensors', async (req, res) => {
  // SELECT * FROM govSensors gSens
  // JOIN govStations gStat
  // ON gSens.id = gStat.id;
})
