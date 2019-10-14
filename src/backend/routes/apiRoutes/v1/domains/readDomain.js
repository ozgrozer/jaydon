const { dbGet, dbAll } = require.main.require('./db/db')

const readDomain = async (req, res) => {
  const result = { success: false }

  try {
    let getDomains = {}
    const { data } = req.body

    if (Object.prototype.hasOwnProperty.call(data, 'id')) {
      const _getDomains = await dbGet({
        query: `
          select * from domains
          where id='${data.id}'
        `
      })
      getDomains = _getDomains.row
    } else {
      const _getDomains = await dbAll({
        query: `
          select * from domains
        `
      })
      getDomains = _getDomains.rows
    }

    result.success = true
    result.data = getDomains
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = readDomain
