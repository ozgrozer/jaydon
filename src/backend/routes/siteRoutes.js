const path = require('path')
const express = require('express')
const helmet = require('helmet')

const router = express.Router()
router.use(express.json())
router.use(helmet())
router.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')))

router.get('*', require('./siteRoutes/siteRoutesIndex'))

router.post('/sign-in', (req, res) => {
  const result = {
    success: false
  }

  req.session.isAuthenticated = true
  req.session.cookie.maxAge = 2592000000

  result.success = true

  res.json(result)
})

router.post('/sign-out', (req, res) => {
  const result = {
    success: false
  }

  delete req.session.isAuthenticated
  result.success = true

  res.json(result)
})

module.exports = router
