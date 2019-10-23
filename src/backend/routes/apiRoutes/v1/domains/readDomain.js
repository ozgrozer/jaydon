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
    const findDomains = ifIdExists ? _findDomains[0] : _findDomains

    result.success = true
    result.data = findDomains
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = readDomain
