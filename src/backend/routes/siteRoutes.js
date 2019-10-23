const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const defaults = require.main.require('./defaults')
const validatePost = require.main.require('./middleware/validatePost')

const router = express.Router()
router.use(express.json())
router.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')))
router.use(session({
  resave: true,
  collection: 'session',
  saveUninitialized: false,
  key: defaults.site.dbName,
  secret: '#%qj#+8dvw8H7U9E',
  store: new MongoStore({
    useUnifiedTopology: true,
    url: defaults.site.dbUrl + defaults.site.dbName
  }),
  cookie: { maxAge: 2592000000 }/* 30 days (30 * 24 * 60 * 60 * 1000) */
}))

router.get('*', require('./siteRoutes/getAll'))
router.post('/sign-in', [validatePost], require('./siteRoutes/signIn'))
router.post('/sign-out', require('./siteRoutes/signOut'))
router.post('/connect-api', require('./siteRoutes/connectApi'))

module.exports = router
