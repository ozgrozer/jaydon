const path = require('path')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

const defaults = require('./defaults')
const siteRoutes = require('./routes/siteRoutes')
const apiRoutes = require('./routes/apiRoutes')

const app = express()
app.use('/api/', apiRoutes)
app.use('/', siteRoutes)
app.use(helmet())
app.use(morgan('combined'))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))

const getTimeForConsole = () => new Date(Date.now()).toLocaleString() + ':'

mongoose.connect(defaults.site.dbUrl + defaults.site.dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  app.listen(defaults.site.port, () => {
    console.log(getTimeForConsole(), `${defaults.site.name}: http://localhost:${defaults.site.port}`)
  })
})
