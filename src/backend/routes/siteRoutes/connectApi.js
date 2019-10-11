const commonConnectApi = require.main.require('./routes/common/connectApi')

const connectApi = (req, res) => {
  const { category, event, data, version } = req.body
  const apiKey = req.session.authenticatedUserApiKey
  commonConnectApi({ apiKey, category, event, data, version, req, res })
}

module.exports = connectApi
