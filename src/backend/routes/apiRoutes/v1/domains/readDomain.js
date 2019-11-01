const os = require('os')

const defaults = require.main.require('./defaults')
const { findDocuments } = require.main.require('./db/db')

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
      const getDomain = _findDomains[0].toObject()
      result.data = getDomain

      const osUsername = os.userInfo().username
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      result.data.gitSupportDetails = `git clone ${osUsername}@${ip}:${defaults.git.dir.bare}/${getDomain.domain}.git`
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
