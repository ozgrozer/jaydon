const { createNginxSite } = require.main.require('./common/nginx')
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

const newDomain = async props => {
  const { domain } = props
  const _newDomain = await newDocument({
    model: 'domains',
    data: { domain }
  })
  return _newDomain
}

const createDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { domain } = req.body.data

    await ifDomainExists({ domain })
    await createNginxSite({ domain })
    const _newDomain = await newDomain({ domain })

    result.success = true
    result.data = _newDomain
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createDomain
