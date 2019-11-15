const { deleteNginxSite, deleteGitSupport, deleteSslSupport } = require.main.require('./nginx/nginx')
const { findDocuments, deleteDocuments } = require.main.require('./db/db')

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

const deleteDomainDocument = async props => {
  const { id } = props
  const _deleteDocument = await deleteDocuments({
    model: 'domains',
    select: { _id: id }
  })
  return _deleteDocument
}

const deleteDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { id } = req.body.data

    const { domain, gitSupport, sslSupport } = await getDomainDocument({ id })
    if (gitSupport) await deleteGitSupport({ domain })
    if (sslSupport) deleteSslSupport({ domain, noNginxConfiguration: true })
    await deleteNginxSite({ domain })
    const _deleteDomainDocument = await deleteDomainDocument({ id })

    result.success = true
    result.data = _deleteDomainDocument
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = deleteDomain
