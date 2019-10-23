const mongoose = require('mongoose')
const crypto = require('crypto')

const defaults = require('./defaults')
const { newDocument } = require('./db/db')

mongoose.connect(defaults.site.dbUrl + defaults.site.dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', async () => {
  try {
    const username = 'root'
    const password = crypto.createHash('sha256').update('root').digest('hex')
    const apiKey = '123456'

    await newDocument({
      model: 'adminUsers',
      data: {
        username,
        password,
        apiKey
      }
    })
    console.log('Insert record: adminUsers')

    db.close(() => {
      process.exit(0)
    })
  } catch (e) {
    console.log(e)

    db.close(() => {
      console.log('connection closed with error')
      process.exit(0)
    })
  }
})
