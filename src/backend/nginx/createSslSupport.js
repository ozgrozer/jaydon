const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
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

const issueCertificate = async props => {
  const result = { success: false }

  const test = true
  let runIssuingCertificateCommand = ''
  if (test) {
    runIssuingCertificateCommand = await exec('sh /var/www/certbotDemo.sh')
  } else {
    const { domain } = props
    const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
    runIssuingCertificateCommand = await exec(`certbot certonly --noninteractive --agree-tos --register-unsafely-without-email --webroot --webroot-path ${wwwDirectoryPath} --domain ${domain} --domain www.${domain}`)
  }

  const isIssuingSuccessful = /Congratulations/.test(runIssuingCertificateCommand)

  if (isIssuingSuccessful) {
    result.success = true
  } else {
    result.error = runIssuingCertificateCommand
  }

  return result
}

const createSslSupport = async props => {
  try {
    const { domain, domainId } = props
    await updateDomainDocument({ domainId })
    const _issueCertificate = await issueCertificate({ domain })
    console.log(_issueCertificate)
  } catch (err) {
    console.log(err)
  }
}

module.exports = createSslSupport
