const express = require('express')
const path = require('path')
const app = module.exports = express() // Export the express app for use by the API sub-files
// const mqtt = require('./lib/mqtt')
const pollExecutor = require('./api/pollExecutor.js')

pollExecutor.startAll() // Starts the polling of the gov API

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// All API routes must provide the API token
app.route('/api/*')
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
require('./api/recaptchaValidation.js')

// Routes all none API requests to the index.html (react bundle)
app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

app.listen(process.env.PORT || 3000)
console.log('Started on port', process.env.PORT || 3000)
