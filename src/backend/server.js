const path = require('path')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

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

app.listen(defaults.site.port, () => {
  console.log(getTimeForConsole(), `App is running on http://localhost:${defaults.site.port}`)
})
