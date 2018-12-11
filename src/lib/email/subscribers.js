const subscribers = module.exports = {}
const db = require('../database.js')
const validation = require('../validation.js')
const crypto = require('crypto')

const key = process.env.EMAIL_ENCRYPTION_KEY

subscribers.addUser = async data => {
  try {
    if (!validation.checkEmailFormat(data.email)) throw new Error('Invalid email')
    let row = []

    row.push(parseInt((Date.now() + '').slice(0,-3)))
    row.push(data.name)
    row.push(subscribers.encryptEmail(data.email))
    row.push(data.postcode)
    row.push(data.sensor)
    row.push('{}')

    await db.query(`
      INSERT IGNORE into subscribers (timestamp, name, email, postcode, sensor, lastAlertStates)
      VALUES (?, ?, ?, ?, ?, ?)
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
    `, subscribers.encryptEmail(email))
  } catch (e) {
    console.log('Couldn\'t remove user from database')
    console.log(e)
  }
}

subscribers.encryptEmail = (email) => {
  const cipher = crypto.createCipher('aes-256-cbc', key)
  let cipherText = cipher.update(email, 'utf8', 'hex')
  cipherText += cipher.final('hex')
  return cipherText
}

subscribers.decryptEmail = (encryptedEmail) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key)
  let plaintext = decipher.update(encryptedEmail, 'hex', 'utf8')
  plaintext += decipher.final('utf8')
  return plaintext
}
