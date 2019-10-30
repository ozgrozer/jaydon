const { updateNginxSite, updateGitSupport, deleteGitSupport, createGitSupport } = require.main.require('./nginx/nginx')
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
  const { id, data } = props
  const updateRecord = await updateDocument({
    model: 'domains',
    query: { _id: id },
    data
  })
  return updateRecord
}

const updateDomain = async (req, res) => {
  const result = { success: false }

  try {
    const data = req.body.data
    const id = data.id
    const newDomain = data.domain
    const newDomainGitSupport = data.gitSupport === 'on' || data.gitSupport === true

    const getOldDomain = await getDomainDocument({ id })
    const oldDomain = getOldDomain.domain
    const oldDomainGitSupport = getOldDomain.gitSupport === 'on' || getOldDomain.gitSupport === true

    if (oldDomain !== newDomain) {
      await ifDomainExists({ domain: newDomain })
      await updateNginxSite({ oldDomain, newDomain })
      if (oldDomainGitSupport) {
        await updateGitSupport({ oldDomain, newDomain })
      }
    }

    if (oldDomain === newDomain) {
      if (oldDomainGitSupport && !newDomainGitSupport) {
        await deleteGitSupport({ domain: newDomain })
      } else if (!oldDomainGitSupport && newDomainGitSupport) {
        await createGitSupport({ domain: newDomain })
      }
    }

    const _updateDomainDocument = await updateDomainDocument({
      id,
      data: {
        domain: newDomain,
        gitSupport: newDomainGitSupport
      }
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
