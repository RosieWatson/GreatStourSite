const subscribers = module.exports = {}
const db = require('../database.js')

subscribers.addUser = async data => {
  let name = data.name
  let email = data.email
  let postcode = data.postcode
  let sensor = data.sensor


  let row = []

  row.push(parseInt((Date.now() + '').slice(0,-3)))
  row.push(name)
  row.push(email)
  row.push(postcode)
  row.push(sensor)

  await db.query(`
      INSERT IGNORE into subscribers (timestamp, name, email, postcode, sensor)
      VALUES (?, ?, ?, ?, ?)
    `, row)
}

;(() => {
  subscribers.addUser({name: 'mr test test', email: 'test@test.com', postcode: 'testcode', sensor: 'testsensor'})
})()
