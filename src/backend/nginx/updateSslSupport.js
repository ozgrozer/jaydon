const createSslSupport = require('./createSslSupport')
const deleteSslSupport = require('./deleteSslSupport')

const updateSslSupport = async props => {
  const { oldDomain, newDomain, domainId } = props
  await deleteSslSupport({ domain: oldDomain, noNginxConfiguration: true })
  await createSslSupport({ domain: newDomain, domainId: domainId })
}

module.exports = updateSslSupport
