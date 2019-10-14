const { dbRun } = require.main.require('./db/db')

const createDomain = async (req, res) => {
  const result = { success: false }
  const { data } = req.body

  try {
    const _createDomain = await dbRun({
      query: 'insert into domains(domain, createdAt) values($domain, $createdAt)',
      params: {
        $domain: data.domain,
        $createdAt: +new Date()
      }
    })

    result.data = _createDomain.data
    result.success = true
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createDomain
