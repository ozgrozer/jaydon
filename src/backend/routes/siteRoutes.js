const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const helmet = require('helmet')

const defaults = require.main.require('./defaults')

const router = express.Router()
router.use(express.json())
router.use(helmet())
router.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')))
router.use(session({
  resave: true,
  collection: 'session',
  key: defaults.site.name,
  saveUninitialized: false,
  secret: defaults.site.sessionSecret,
  store: new MongoStore({ url: defaults.site.dbUrl + defaults.site.dbName }),
  cookie: { maxAge: 2592000000 }/* 30 days (30 * 24 * 60 * 60 * 1000) */
}))

router.get('*', require('./siteRoutes/siteRoutesIndex'))

module.exports = router