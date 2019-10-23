const models = require('./models')

const findDocuments = (opts) => {
  return new Promise((resolve, reject) => {
    const Model = models[opts.model]

    Model.find(opts.find, opts.select, (err, items) => {
      if (err) {
        const error = {
          code: 2,
          message: 'DB error',
          detail: err
        }
        reject(error)
      } else {
        const itemsMap = {}

        items.forEach((item, i) => {
          itemsMap[i] = item
        })

        resolve(itemsMap)
      }
    })
    .sort(opts.sort)
    .limit(opts.limit)
    .skip(opts.skip)
  })
}

module.exports = findDocuments
