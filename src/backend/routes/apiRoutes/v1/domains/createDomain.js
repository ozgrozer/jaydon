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

    result.success = true
    result.data = _createDomain.data
    res.json(result)
  } catch (err) {
    result.error = err.error
    res.json(result)
  }
}

module.exports = createDomain
