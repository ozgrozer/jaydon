const {
  updateNginxSite,

  createGitSupport,
  updateGitSupport,
  deleteGitSupport,

  createSslSupport,
  updateSslSupport,
  deleteSslSupport
} = require.main.require('./nginx/nginx')
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
    select: 'domain gitSupport sslSupport'
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
    const { data } = req.body
    const { id, gitSupport, sslSupport, nginxConf } = data
    const newDomain = data.domain
    const newDomainGitSupport = gitSupport === 'on' || gitSupport === true
    const newDomainSslSupport = sslSupport === 'on' || sslSupport === true

    const getOldDomainDocument = await getDomainDocument({ id })
    const oldDomain = getOldDomainDocument.domain
    const oldDomainGitSupport = getOldDomainDocument.gitSupport === true
    const oldDomainSslSupport = getOldDomainDocument.sslSupport === true

    if (oldDomain !== newDomain) {
      await ifDomainExists({ domain: newDomain })
      await updateNginxSite({ oldDomain, newDomain, nginxConf })

      if (oldDomainGitSupport && newDomainGitSupport) {
        await updateGitSupport({ oldDomain, newDomain })
      }

      if (oldDomainSslSupport && newDomainSslSupport) {
        updateSslSupport({ oldDomain, newDomain, domainId: id })
      }
    }

    if (oldDomainGitSupport && !newDomainGitSupport) {
      await deleteGitSupport({ domain: oldDomain })
    } else if (!oldDomainGitSupport && newDomainGitSupport) {
      await createGitSupport({ domain: newDomain })
    }

    if (oldDomainSslSupport && !newDomainSslSupport) {
      deleteSslSupport({ domain: oldDomain, domainId: id })
    } else if (!oldDomainSslSupport && newDomainSslSupport) {
      createSslSupport({ domain: newDomain, domainId: id })
    }

    const updateDocumentData = {
      domain: newDomain,
      gitSupport: newDomainGitSupport,
      sslSupport: newDomainSslSupport
    }
    const _updateDomainDocument = await updateDomainDocument({
      id,
      data: updateDocumentData
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
