const crypto = require('crypto')
const mongoose = require('mongoose')
const publicIp = require('public-ip')

const defaults = require('./defaults')
const { newDocument } = require('./db/db')

mongoose.connect(defaults.site.dbUrl + defaults.site.dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const randomString = length => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const createAdminUser = async () => {
  const username = 'root'

  const password = randomString(16)
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

  const apiKey = randomString(32)
  const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex')

  console.log('Username:', username)
  console.log('Password:', password)
  console.log('API Key:', apiKey)

  await newDocument({
    model: 'adminUsers',
    data: {
      username,
      apiKey: hashedApiKey,
      password: hashedPassword
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
