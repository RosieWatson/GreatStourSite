const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = module.exports = express() // Export the express app for use by the API sub-files
// const mqtt = require('./lib/mqtt')
const pollExecutor = require('./api/pollExecutor.js')

pollExecutor.startAll() // WILL YOU START THE POLLS PLEASEEEE
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.route('/api/*') // All API routes must provide the API token
  .get((req, res, next) => {
    if (req && req.query && req.query.token !== process.env.API_TOKEN) return res.sendStatus(403)
    next()
  })
  .post((req, res, next) => {
    if (req && req.body && req.body.token !== process.env.API_TOKEN) return res.sendStatus(403)
    next()
  })

require('./api/govData.js')
require('./api/email.js')
require('./api/mqttData.js')

app.listen(process.env.PORT || 3000)
console.log('Started on port', process.env.PORT || 3000)
