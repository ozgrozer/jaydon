const { deleteNginxSite, deleteGitSupport } = require.main.require('./nginx/nginx')
const { findDocuments, deleteDocuments } = require.main.require('./db/db')

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

const deleteDomainDocument = async props => {
  const { id } = props
  const deleteDomain = await deleteDocuments({
    model: 'domains',
    select: { _id: id }
  })
  return deleteDomain
}

const deleteDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { id } = req.body.data

    const { domain, gitSupport } = await getDomainDocument({ id })
    if (gitSupport) deleteGitSupport({ domain })
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
