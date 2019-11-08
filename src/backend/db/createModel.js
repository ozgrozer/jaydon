const mongoose = require('mongoose')

const schemas = require('./schemas')

const createModel = props => {
  const { name } = props

  const necessarySchema = { createdAt: Number, updatedAt: Number }
  const combineSchemas = { ...necessarySchema, ...schemas[name] }
  const schema = mongoose.Schema(combineSchemas)

  schema.pre('save', function (next) {
    const unixTime = Math.round(+new Date() / 1000)
    this.createdAt = unixTime
    next()
  })

  schema.pre('updateOne', function () {
    const unixTime = Math.round(+new Date() / 1000)
    this.update({}, { $set: { updatedAt: unixTime } })
  })

  return mongoose.model(name, schema)
}

module.exports = createModel
