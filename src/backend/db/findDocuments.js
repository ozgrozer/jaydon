const models = require('./models')

const findDocuments = props => {
  return new Promise((resolve, reject) => {
    const { model, find, select, sort, limit, skip } = props

    const Model = models[model]

    Model
      .find(find, select, (err, items) => {
        if (err) {
          const error = {
            code: 2,
            message: 'DB error',
            detail: err
          }
          reject(error)
        } else {
          const result = {}

          items.forEach((_item, i) => {
            const item = _item.toObject()
            item.id = item._id
            delete item._id
            delete item.__v
            result[i] = item
          })

          resolve(result)
        }
      })
      .sort(sort)
      .limit(limit)
      .skip(skip)
  })
}

module.exports = findDocuments
