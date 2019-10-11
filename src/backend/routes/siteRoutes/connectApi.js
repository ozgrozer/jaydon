const commonConnectApi = require.main.require('./routes/common/connectApi')

const connectApi = (req, res) => {
  const { category, event, version } = req.body.meta
  const data = req.body.data
  const apiKey = req.session.authenticatedUserApiKey
  const meta = { apiKey, category, event, version }
  const express = { req, res }
  commonConnectApi({ meta, data, express })
}

module.exports = connectApi
