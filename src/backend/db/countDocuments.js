const models = require('./models')

const countDocuments = props => {
  return new Promise((resolve, reject) => {
    const { model, find } = props

    const Model = models[model]

    Model.countDocuments(find, (err, _count) => {
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
