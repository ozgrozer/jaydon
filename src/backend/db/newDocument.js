const models = require('./models')

const newDocument = (opts) => {
  return new Promise((resolve, reject) => {
    const Model = models[opts.model]

    const instance = new Model(opts.data)
    instance.save((err) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        resolve(instance)
      }
    })
  })
}

module.exports = newDocument
