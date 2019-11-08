const models = require('./models')

const distinctDocuments = props => {
  return new Promise((resolve, reject) => {
    const { model, field, find } = props

    const Model = models[model]

    Model.distinct(field, find, (err, count) => {
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
