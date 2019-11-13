const { updateDocument } = require.main.require('./db/db')

const updateDomainDocument = async props => {
  const { domainId } = props
  const unixTime = Math.round(+new Date() / 1000)
  const _updateDocument = await updateDocument({
    model: 'domains',
    query: { _id: domainId },
    data: {
      sslCertificate: {
        status: 'started',
        createdAt: unixTime
      }
    }
  })
  return _updateDocument
}

const createSslSupport = async props => {
  const { domain, domainId } = props
  await updateDomainDocument({ domainId })
  console.log('createSslSupport', domain, domainId)
}

module.exports = createSslSupport
