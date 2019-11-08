const models = require('./models')

const updateDocument = props => {
  return new Promise((resolve, reject) => {
    const { model, query, data } = props

    const Model = models[model]

    const setData = {}
    Object.keys(data).map(itemName => {
      if (itemName !== 'controllerName' && itemName !== '_id') {
        setData[itemName] = data[itemName]
      }
    })

    Model.updateMany(query, { $set: setData }, (err) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        const result = data
        if (Object.prototype.hasOwnProperty.call(query, '_id')) {
          result.id = query._id
        }
        resolve(result)
      }
    })
  })
}

module.exports = updateDocument
