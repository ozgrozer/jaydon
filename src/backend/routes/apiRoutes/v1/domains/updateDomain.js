const { dbRun } = require.main.require('./db/db')

const updateDomain = async (req, res) => {
  const result = { success: false }
  const { data } = req.body

  try {
    const _updateDomain = await dbRun({
      query: 'update domains set domain=$domain, updatedAt=$updatedAt where id=$id',
      params: {
        $id: data.id,
        $domain: data.domain,
        $updatedAt: +new Date()
      }
    })

    result.success = true
    result.data = _updateDomain.data
    res.json(result)
  } catch (err) {
    result.error = err.error
    res.json(result)
  }
}

module.exports = updateDomain
