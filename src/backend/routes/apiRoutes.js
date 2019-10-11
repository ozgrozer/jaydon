const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const router = express.Router()
router.use(express.json())
router.use(helmet())
router.use(cors())

const commonConnectApi = require.main.require('./routes/common/connectApi')

router.post('/v1', async (req, res) => {
  const { apiKey, category, event, data } = req.body
  const version = '1'
  commonConnectApi({ apiKey, category, event, data, version, req, res })
})

module.exports = router
