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

require('./api/email.js')

app.listen(process.env.PORT || 3000)
