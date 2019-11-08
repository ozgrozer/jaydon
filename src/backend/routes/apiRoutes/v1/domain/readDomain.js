const os = require('os')

const defaults = require.main.require('./defaults')
const { findDocuments } = require.main.require('./db/db')

const getServerIp = async () => {
  const getSettings = await findDocuments({
    model: 'settings',
    find: {
      key: 'server'
    }
  })

  if (Object.keys(getSettings).length) {
    const getServerSettings = getSettings[0].value
    return getServerSettings.ip
  }
}

const readDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { data } = req.body

    const ifIdExists = Object.prototype.hasOwnProperty.call(data, 'id')
    const find = ifIdExists ? { _id: data.id } : {}
    const _findDomains = await findDocuments({
      model: 'domains',
      find,
      sort: { _id: -1 }
    })

    if (ifIdExists) {
      const getDomain = _findDomains[0]
      result.data = getDomain

      const osUsername = os.userInfo().username
      const serverIp = await getServerIp()
      result.data.gitSupportDetails = `git clone ${osUsername}@${serverIp}:${defaults.git.dir.bare}/${getDomain.domain}.git`
    } else {
      result.data = _findDomains
    }

    result.success = true
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = readDomain
