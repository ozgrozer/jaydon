const mongoose = require('mongoose')
const crypto = require('crypto')
const publicIp = require('public-ip')

const defaults = require('./defaults')
const { newDocument } = require('./db/db')

mongoose.connect(defaults.site.dbUrl + defaults.site.dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const createAdminUser = async () => {
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
}

const learnServerIpAddress = async () => {
  const ip = await publicIp.v4()

  await newDocument({
    model: 'settings',
    data: {
      key: 'server',
      value: { ip }
    }
  })
}

const db = mongoose.connection
db.once('open', async () => {
  try {
    console.log('Creating admin user')
    await createAdminUser()
    console.log('Learning external IP address')
    await learnServerIpAddress()

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
