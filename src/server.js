const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
// const mqtt = require('./lib/mqtt')
const pollExecutor = require('./api/pollExecutor.js')

pollExecutor.startAll() // WILL YOU START THE POLLS PLEASEEEE
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', function (req, res) {
 return res.send('pong')
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(process.env.PORT || 3000)
