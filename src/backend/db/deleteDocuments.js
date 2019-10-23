const models = require('./models')

const deleteDocuments = (opts) => {
  return new Promise((resolve, reject) => {
    const Model = models[opts.model]

    Model.deleteMany(opts.select, (err) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        resolve(opts.select)
      }
    })
  })
}

module.exports = deleteDocuments
