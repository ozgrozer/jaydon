const models = require('./models')

const aggregateDocuments = props => {
  return new Promise((resolve, reject) => {
    const Model = models[props.model]

    Model.aggregate(props.pipeline, (err, res) => {
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
