const path = require('path')
const express = require('express')
const helmet = require('helmet')

const router = express.Router()
router.use(express.json())
router.use(helmet())
router.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')))

router.get('*', require('./siteRoutes/getAll'))
router.post('/sign-in', require('./siteRoutes/signIn'))
router.post('/sign-out', require('./siteRoutes/signOut'))

module.exports = router
