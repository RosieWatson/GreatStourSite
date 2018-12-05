const subscribers = module.exports = {}
const db = require('../database.js')

subscribers.addUser = async data => {
  try {
    let row = []

    row.push(parseInt((Date.now() + '').slice(0,-3)))
    row.push(data.name)
    row.push(data.email)
    row.push(data.postcode)
    row.push(data.sensor)

    await db.query(`
      INSERT IGNORE into subscribers (timestamp, name, email, postcode, sensor)
      VALUES (?, ?, ?, ?, ?)
    `, row)
  } catch (e) {
    console.log('Couldn\'t insert user into database')
    console.log(e)
  }
}

subscribers.removeUser = async email => {
  try {
    await db.query(`
      DELETE FROM subscribers WHERE email = ?
    `, email)
  } catch (e) {
    console.log('Couldn\'t remove user from database')
    console.log(e)
  }
}

;(() => {
  // subscribers.addUser({name: 'mr test test', email: 'test@test.com', postcode: 'testcode', sensor: 'testsensor'})
  subscribers.removeUser('test@test.com')
})()
