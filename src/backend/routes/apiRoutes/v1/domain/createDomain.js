const { createNginxSite, createGitSupport, createSslSupport } = require.main.require('./nginx/nginx')
const { findDocuments, newDocument } = require.main.require('./db/db')

const ifDomainExists = async props => {
  const { domain } = props
  const findDomains = await findDocuments({
    model: 'domains',
    find: { domain },
    select: 'domain'
  })

  if (Object.keys(findDomains).length) {
    throw new Error('Domain already exists')
  } else {
    return true
  }
}

const newDomain = async data => {
  const _newDomain = await newDocument({
    model: 'domains',
    data
  })
  return _newDomain
}

const createDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { domain } = req.body.data
    let { gitSupport, sslSupport } = req.body.data
    gitSupport = gitSupport === 'on' || gitSupport === true
    sslSupport = sslSupport === 'on' || sslSupport === true
    const newDocumentData = {
      domain,
      gitSupport,
      sslSupport
    }

    await ifDomainExists({ domain })
    await createNginxSite({ domain })
    const _newDomain = await newDomain(newDocumentData)
    if (gitSupport) await createGitSupport({ domain })
    if (sslSupport) await createSslSupport({ domain })

    result.success = true
    result.data = _newDomain
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createDomain
