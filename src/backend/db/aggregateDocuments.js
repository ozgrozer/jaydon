const models = require('./models')

const aggregateDocuments = props => {
  return new Promise((resolve, reject) => {
    const { model, pipeline } = props

    const Model = models[model]

    Model.aggregate(pipeline, (err, res) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = aggregateDocuments
