const path = require('path')
const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)

const defaults = require.main.require('./defaults')

const dbPath = `./../../${defaults.site.dbName}.sqlite`

const router = express.Router()
router.use(express.json())
router.use(helmet())
router.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')))
router.use(session({
  resave: true,
  saveUninitialized: false,
  key: defaults.site.dbName,
  secret: '#%qj#+8dvw8H7U9E',
  store: new SQLiteStore({
    db: dbPath
  }),
  cookie: { maxAge: 2592000000 }/* 30 days (30 * 24 * 60 * 60 * 1000) */
}))

router.get('*', require('./siteRoutes/getAll'))
router.post('/sign-in', require('./siteRoutes/signIn'))
router.post('/sign-out', require('./siteRoutes/signOut'))

module.exports = router
