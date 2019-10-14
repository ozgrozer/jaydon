const path = require('path')
const sqlite3 = require('sqlite3')

const defaults = require('./../defaults')

const dbPath = path.join(__dirname, '..', '..', '..', `${defaults.site.dbName}.sqlite`)

const dbRun = props => {
  return new Promise((resolve, reject) => {
    const { query, params } = props
    const result = { success: false }

    const db = new sqlite3.Database(dbPath, err => {
      if (err) {
        result.errorType = 'db open error'
        result.error = err.message
        reject(result)
      }
    })

    // use es5 function syntax to access 'this'
    db.run(query, params, function (err) {
      if (err) {
        result.errorType = 'query error'
        result.error = err.message
        reject(result)
      }

      result.data = {}
      Object.entries(params).map(param => {
        result.data[param[0].substr(1)] = param[1]
      })

      if (query.substr(0, 6) === 'insert') {
        result.data.id = this.lastID
      }

      if (this.changes > 0) {
        result.success = true
      } else {
        result.error = 'no changes'
        reject(result)
      }

      resolve(result)
    })

    db.close(err => {
      if (err) {
        result.errorType = 'db close error'
        result.error = err.message
        reject(result)
      }
    })
  })
}

module.exports = dbRun
