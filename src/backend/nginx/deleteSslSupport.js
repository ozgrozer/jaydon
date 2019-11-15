const os = require('os')

const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const spawn = require.main.require('./common/spawn')
const { updateDocument } = require.main.require('./db/db')
const nginxConfigurationGenerator = require('./nginxConfigurationGenerator')
const restartNginxServiceCommand = require('./restartNginxServiceCommand')

const updateDomainDocument = async props => {
  const { domainId, status, error } = props
  const unixTime = Math.round(+new Date() / 1000)

  /* status: obtaining, obtained, obtainingError, revoking, revoked, revokingError */
  let data = {}
  if (status === 'revoking' || status === 'revoked') {
    data = {
      'sslCertificate.error': '',
      'sslCertificate.status': status,
      'sslCertificate.updatedAt': unixTime
    }
  } else if (status === 'revokingError') {
    data = {
      'sslCertificate.error': error,
      'sslCertificate.status': status,
      'sslCertificate.updatedAt': unixTime
    }
  }

  const _updateDocument = await updateDocument({
    model: 'domains',
    query: { _id: domainId },
    data
  })

  return _updateDocument
}

const revokeCertificate = props => {
  return new Promise((resolve, reject) => {
    const { domain } = props
    const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`

    let spawnProps = {}
    if (os.type() === 'Darwin') {
      spawnProps = {
        command: 'sh',
        args: [
          `${defaults.nginx.dir.www}/revokeCertificate.sh`,
          '--domain',
          domain,
          '--path',
          wwwDirectoryPath
        ]
      }
    } else {
      spawnProps = {
        command: 'certbot',
        args: [
          'revoke',
          '--cert-path',
          `${defaults.letsencrypt.dir}/live/${domain}/fullchain.pem`,
          '--delete-after-revoke'
        ]
      }
    }

    spawn(spawnProps)
      .then(res => {
        const isRevokingSuccessful = /Congratulations/.test(res)
        if (isRevokingSuccessful) {
          resolve(true)
        } else {
          /* create a cron job here to try to re-revoke certificate later */

          reject(res)
        }
      })
  })
}

const updateNginxConfiguration = async props => {
  const { domain } = props
  const nginxConfigurationFileContent = nginxConfigurationGenerator({
    domain,
    ssl: false
  })
  const nginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`

  const commands = [
    `echo "${nginxConfigurationFileContent}" > ${nginxConfigurationFilePath}`,
    restartNginxServiceCommand
  ]

  const joinCommands = commands.join(' && ')
  const result = await exec(joinCommands)
  return result
}

const deleteSslSupport = async props => {
  const { domain, domainId, noNginxConfiguration } = props

  try {
    await updateDomainDocument({ domainId, status: 'revoking' })
    await revokeCertificate({ domain })
    if (!noNginxConfiguration) await updateNginxConfiguration({ domain })
    await updateDomainDocument({ domainId, status: 'revoked' })
  } catch (err) {
    console.log(err)

    let errorMessage = err
    if (typeof err === 'object') {
      errorMessage = Object.prototype.hasOwnProperty.call(err, 'message')
        ? err.message
        : err
    }

    await updateDomainDocument({
      domainId,
      error: errorMessage,
      status: 'revokingError'
    })
  }
}

module.exports = deleteSslSupport
