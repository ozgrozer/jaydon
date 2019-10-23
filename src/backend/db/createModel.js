const mongoose = require('mongoose')

const schemas = require('./schemas')

const createModel = props => {
  const necessarySchema = { createdAt: Number, updatedAt: Number }
  const combineSchemas = { ...necessarySchema, ...schemas[props.name] }
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

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  return mongoose.model(props.name, schema)
}

module.exports = createModel
