const subscribers = module.exports = {}
const db = require('../database.js')
const validation = require('../validation.js')


subscribers.addUser = async data => {
  try {
    if (!validation.checkEmailFormat(data.email)) throw new Error('Invalid email')
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
    if (!validation.checkEmailFormat(email)) throw new Error('Invalid email')
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
