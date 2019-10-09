const path = require('path')
const express = require('express')

const defaults = require('./defaults')
const siteRoutes = require('./routes/siteRoutes')

const app = express()
app.use('/', siteRoutes)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))

const getTimeForConsole = () => new Date(Date.now()).toLocaleString() + ':'

app.listen(defaults.site.port, () => {
  console.log(getTimeForConsole(), `${defaults.site.name}: http://localhost:${defaults.site.port}`)
})
