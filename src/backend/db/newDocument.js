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
        const newInstance = instance.toObject()
        newInstance.id = newInstance._id
        delete newInstance._id
        delete newInstance.__v
        resolve(newInstance)
      }
    })
  })
}

module.exports = newDocument
