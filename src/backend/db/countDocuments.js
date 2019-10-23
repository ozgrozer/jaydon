const models = require('./models')

const countDocuments = (opts) => {
  return new Promise((resolve, reject) => {
    const Model = models[opts.model]

    Model.countDocuments(opts.find, (err, _count) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        resolve(_count)
      }
    })
  })
}

module.exports = countDocuments
