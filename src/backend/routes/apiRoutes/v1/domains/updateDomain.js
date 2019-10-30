const { updateNginxSite, updateGitSupport } = require.main.require('./nginx/nginx')
const { findDocuments, updateDocument } = require.main.require('./db/db')

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

const getDomainDocument = async props => {
  const { id } = props
  const findDomains = await findDocuments({
    model: 'domains',
    find: { _id: id },
    select: 'domain gitSupport'
  })

  if (Object.keys(findDomains).length) {
    return findDomains[0]
  } else {
    throw new Error('Domain couldn\'t found')
  }
}

const updateDomainDocument = async props => {
  const { id, domain } = props
  const updateRecord = await updateDocument({
    model: 'domains',
    query: { _id: id },
    data: { domain }
  })
  return updateRecord
}

const updateDomain = async (req, res) => {
  const result = { success: false }

  try {
    const id = req.body.data.id
    const newDomain = req.body.data.domain
    const newDomainGitSupport = req.body.data.gitSupport

    const getOldDomain = await getDomainDocument({ id })
    const oldDomain = getOldDomain.domain
    const oldDomainGitSupport = getOldDomain.gitSupport

    if (oldDomain !== newDomain) {
      await ifDomainExists({ domain: newDomain })
      await updateNginxSite({ oldDomain, newDomain })
      if (oldDomainGitSupport) await updateGitSupport({ oldDomain, newDomain })
    }

    const _updateDomainDocument = await updateDomainDocument({
      id,
      domain: newDomain,
      gitSupport: newDomainGitSupport
    })

    result.success = true
    result.data = _updateDomainDocument
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = updateDomain
