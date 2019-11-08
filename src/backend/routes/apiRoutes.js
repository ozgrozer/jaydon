const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const router = express.Router()
router.use(express.json())
router.use(helmet())
router.use(cors())

const commonConnectApi = require.main.require('./routes/common/connectApi')

router.post('/v1', async (req, res, next) => {
  try {
    const { apiKey, category, event } = req.body.meta
    const data = req.body.data || {}
    const version = '1'
    const meta = { apiKey, category, event, version }
    const express = { req, res, next }
    commonConnectApi({ meta, data, express })
  } catch (err) {
    res.json({ success: false })
  }
})

module.exports = router
