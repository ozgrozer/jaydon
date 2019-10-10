const path = require('path')
const sqlite3 = require('sqlite3')

const defaults = require('./../defaults')

const dbPath = path.join(__dirname, '..', '..', '..', `${defaults.site.dbName}.sqlite`)

const dbGet = props => {
  return new Promise((resolve, reject) => {
    const result = {
      success: false
    }

    const db = new sqlite3.Database(dbPath, err => {
      if (err) {
        result.errorType = 'db open error'
        result.error = err.message
        reject(result)
      }
    })

    db.get(props.query, (err, rows) => {
      db.close(err => {
        if (err) {
          result.errorType = 'db close error'
          result.error = err.message
          reject(result)
        }
      })

      if (err) {
        result.errorType = 'query error'
        result.error = err.message
        reject(result)
      }

      result.rows = rows
      resolve(result)
    })
  })
}

module.exports = dbGet
