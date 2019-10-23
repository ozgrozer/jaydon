const models = require('./models')

const distinctDocuments = (opts) => {
  return new Promise((resolve, reject) => {
    const Model = models[opts.model]

    Model.distinct(opts.field, opts.find, (err, count) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        resolve(count)
      }
    })
  })
}

module.exports = distinctDocuments
