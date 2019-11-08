const models = require('./models')

const newDocument = props => {
  return new Promise((resolve, reject) => {
    const { model, data } = props

    const Model = models[model]

    const instance = new Model(data)
    instance.save((err) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        const result = instance.toObject()
        result.id = result._id
        delete result._id
        delete result.__v
        resolve(result)
      }
    })
  })
}

module.exports = newDocument
