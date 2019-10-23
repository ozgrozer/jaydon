const models = require('./models')

const updateDocument = (opts) => {
  return new Promise((resolve, reject) => {
    const Model = models[opts.model]

    const setData = {}
    Object.keys(opts.data).map((itemName) => {
      if (itemName !== 'controllerName' && itemName !== '_id') {
        setData[itemName] = opts.data[itemName]
      }
    })

    const query = opts.data._id ? { _id: opts.data._id } : opts.query

    Model.updateMany(query, { $set: setData }, (err) => {
      const error = {}

      if (err) {
        error.code = 2
        error.message = 'DB error'
        error.detail = err
        reject(error)
      } else {
        resolve(opts.data)
      }
    })
  })
}

module.exports = updateDocument
