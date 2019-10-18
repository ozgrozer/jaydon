const { createWwwDirectory, createNginxConfFile } = require.main.require('./common/nginx')
const { dbRun, dbGet } = require.main.require('./db/db')

const checkDomainRow = async props => {
  const { domain } = props
  const checkDomain = await dbGet({
    query: `
      select domain from domains
      where domain='${domain}'
    `
  })
  if (checkDomain.row) {
    throw new Error('Domain already exists')
  }
  return true
}

const createDomainRow = async props => {
  const { domain } = props
  const createRecord = await dbRun({
    query: 'insert into domains(domain, createdAt) values($domain, $createdAt)',
    params: {
      $domain: domain,
      $createdAt: +new Date()
    }
  })
  return createRecord
}

const createDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { domain } = req.body.data

    await checkDomainRow({ domain })
    await createWwwDirectory({ domain })
    await createNginxConfFile({ domain })
    const _createDomainRow = await createDomainRow({ domain })

    result.success = true
    result.data = _createDomainRow.data
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createDomain
