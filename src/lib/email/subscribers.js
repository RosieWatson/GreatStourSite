const subscribers = module.exports = {}
const db = require('../database.js')
const validation = require('../validation.js')
const crypto = require('crypto')

const key = process.env.EMAIL_ENCRYPTION_KEY

// Function to add users to the subscriber database
subscribers.addUser = async data => {
  try {
    if (!validation.checkEmailFormat(data.email)) throw new Error('Invalid email')
    let row = []

    row.push(parseInt((Date.now() + '').slice(0,-3))) // Getting the current UNIX timestamp and removing milliseconds
    row.push(data.name)
    row.push(subscribers.encryptEmail(data.email)) // Encrypts the email before entering into the DB
    row.push(data.postcode)
    row.push('{}')

    await db.query(`
      INSERT IGNORE into subscribers (timestamp, name, email, postcode, lastAlertStates)
      VALUES (?, ?, ?, ?, ?)
    `, row)
  } catch (e) {
    console.log('Couldn\'t insert user into database')
    console.log(e)
  }
}

// Function to add users to the subscriber database
subscribers.removeUser = async email => {
  try {
    if (!validation.checkEmailFormat(email)) throw new Error('Invalid email')
    await db.query(`
      DELETE FROM subscribers WHERE email = ?
    `, subscribers.encryptEmail(email)) // Have to encrypt email to be able to find it in the DB
  } catch (e) {
    console.log('Couldn\'t remove user from database')
    console.log(e)
  }
}

// Encrypts the email using aes-256
subscribers.encryptEmail = (email) => {
  const cipher = crypto.createCipher('aes-256-cbc', key)
  let cipherText = cipher.update(email, 'utf8', 'hex')
  cipherText += cipher.final('hex')
  return cipherText
}

// Decrypts the email using aes-256
subscribers.decryptEmail = (encryptedEmail) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key)
  let plaintext = decipher.update(encryptedEmail, 'hex', 'utf8')
  plaintext += decipher.final('utf8')
  return plaintext
}
