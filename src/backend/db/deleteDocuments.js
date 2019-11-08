const models = require('./models')

const deleteDocuments = props => {
  return new Promise((resolve, reject) => {
    const { model, select } = props

    const Model = models[model]

    Model.deleteMany(select, (err) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        resolve(select)
      }
    })
  })
}

module.exports = deleteDocuments
