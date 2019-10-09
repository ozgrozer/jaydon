const path = require('path')
const express = require('express')
const sqlite3 = require('sqlite3')

const defaults = require('./defaults')
const siteRoutes = require('./routes/siteRoutes')

const app = express()
app.use('/', siteRoutes)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))

const getTimeForConsole = () => new Date(Date.now()).toLocaleString() + ':'

const dbPath = path.join(__dirname, '..', '..', `${defaults.site.dbName}.sqlite`)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.log(err)

  console.log(getTimeForConsole(), `Connected to database ${dbPath}`)

  app.listen(defaults.site.port, () => {
    console.log(getTimeForConsole(), `App is running on http://localhost:${defaults.site.port}`)
  })
})
