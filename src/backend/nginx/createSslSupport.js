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

  /* status: obtaining|active|deleted|error */
  let data = {}
  if (status === 'obtaining') {
    data = {
      'sslCertificate.status': status,
      'sslCertificate.createdAt': unixTime
    }
  } else if (status === 'active') {
    data = {
      'sslCertificate.status': status,
      'sslCertificate.updatedAt': unixTime
    }
  } else if (status === 'error') {
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

const obtainCertificate = props => {
  return new Promise((resolve, reject) => {
    const { domain } = props
    const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`

    let spawnProps = {}
    if (os.type() === 'Darwin') {
      spawnProps = {
        command: 'sh',
        args: [
          `${defaults.nginx.dir.www}/certbotDemo.sh`,
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
          'certonly',
          '--noninteractive',
          '--agree-tos',
          '--register-unsafely-without-email',
          '--webroot',
          '--webroot-path',
          wwwDirectoryPath,
          '--domain',
          domain,
          '--domain',
          `www.${domain}`
        ]
      }
    }

    spawn(spawnProps)
      .then(res => {
        console.log('obtainCertificate')
        console.log(res)

        const isObtainingSuccessful = /Congratulations/.test(res)
        if (isObtainingSuccessful) {
          resolve(true)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

const updateNginxConfiguration = async props => {
  const { domain } = props
  const nginxConfigurationFileContent = nginxConfigurationGenerator({
    domain,
    ssl: true
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

const createSslSupport = async props => {
  const { domain, domainId } = props

  try {
    await updateDomainDocument({ domainId, status: 'obtaining' })
    await obtainCertificate({ domain })
    await updateNginxConfiguration({ domain })
    await updateDomainDocument({ domainId, status: 'active' })
  } catch (err) {
    console.log('createSslSupport error')
    console.log(err)

    let errorMessage = err
    if (typeof err === 'object') {
      errorMessage = Object.prototype.hasOwnProperty.call(err, 'message')
        ? err.message
        : err
    }

    await updateDomainDocument({
      domainId,
      status: 'error',
      error: errorMessage
    })
  }
}

module.exports = createSslSupport
