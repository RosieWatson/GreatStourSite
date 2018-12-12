const database = module.exports = {}
const mysql = require('mysql')
const { promisify } = require('util')
let pool

// Gets credentials from process environment variables or defaults them back to localhost
database.getCredentials = () => {
  return {
    host: process.env.SQL_HOST || 'localhost',
    port: process.env.SQL_PORT || '3306',
    user: process.env.SQL_USERNAME || 'root',
    password: process.env.SQL_PASSWORD || null
  }
}

// Starts up the DB and creats a pool with a 25 connection limit.
database.start = () => {
  if (pool) return

  // Creates DB pool
  pool = mysql.createPool(Object.assign(database.getCredentials(), {
    connectionLimit: 5,
    timezone: 'Z'
  }))

  // Sets it to use the correct mode and DB
  pool.on('connection', connection => {
    connection.query(`SET SESSION sql_mode = 'ANSI_QUOTES';`)
    connection.query(`USE rkw8;`)
  })
}

// Function to query the DB
database.query = (query, values) => {
  if (!pool) database.start()

  const _query = cb => {
    pool.query({
      sql: query,
      timeout: 10000,
      values
    }, (err, results) => {
      if (err) {
        console.log(err, 'database error')
        return cb(err)
      }

      return cb(null, results)
    })
  }

  return promisify(_query)()
}
