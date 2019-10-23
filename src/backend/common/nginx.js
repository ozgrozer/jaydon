const os = require('os')

const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')

const osType = os.type()
const restartNginxServiceCommand = osType === 'Darwin'
  ? 'brew services restart nginx'
  : 'service nginx restart'

const deleteFirstLine = str => {
  const lines = str.split('\n')
  lines.splice(0, 1)
  const joinLines = lines.join('\n')
  return joinLines
}

const nginxConfGen = props => {
  const { domain } = props
  const domainDirectory = `${defaults.nginx.dir.www}/${domain}`

  const result = `
server {
  listen 80;
  server_name ${domain};
  root ${domainDirectory};
}
`

  return deleteFirstLine(result)
}

const createNginxSite = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const nginxConfFileContent = nginxConfGen({ domain })
  const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxLinkedConfFolderPath = `${defaults.nginx.dir.core}/sites-enabled/`

  const createWwwDirectory = `mkdir ${wwwDirectoryPath}`
  const createNginxConfFile = `echo "${nginxConfFileContent}" > ${nginxConfFilePath}`
  const linkNginxConfFile = `ln -s ${nginxConfFilePath} ${nginxLinkedConfFolderPath}`

  const result = await exec(`${createWwwDirectory} && ${createNginxConfFile} && ${linkNginxConfFile} && ${restartNginxServiceCommand}`)
  return result
}
const updateNginxSite = async props => {
  const { oldDomain, newDomain } = props
  const oldWwwDirectoryPath = `${defaults.nginx.dir.www}/${oldDomain}`
  const newWwwDirectoryPath = `${defaults.nginx.dir.www}/${newDomain}`
  const oldNginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${oldDomain}`
  const oldLinkedNginxConfFilePath = `${defaults.nginx.dir.core}/sites-enabled/${oldDomain}`
  const nginxConfFileContent = nginxConfGen({ domain: newDomain })
  const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${newDomain}`
  const nginxLinkedConfFolderPath = `${defaults.nginx.dir.core}/sites-enabled/`

  const updateWwwDirectory = `mv ${oldWwwDirectoryPath} ${newWwwDirectoryPath}`
  const deleteOldNginxConfFile = `rm ${oldNginxConfFilePath}`
  const deleteOldLinkedNginxConfFile = `rm ${oldLinkedNginxConfFilePath}`
  const createNginxConfFile = `echo "${nginxConfFileContent}" > ${nginxConfFilePath}`
  const linkNginxConfFile = `ln -s ${nginxConfFilePath} ${nginxLinkedConfFolderPath}`

  const result = await exec(`${updateWwwDirectory} && ${deleteOldNginxConfFile} && ${deleteOldLinkedNginxConfFile} && ${createNginxConfFile} && ${linkNginxConfFile} && ${restartNginxServiceCommand}`)
  return result
}
const deleteNginxSite = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxLinkedConfFilePath = `${defaults.nginx.dir.core}/sites-enabled/${domain}`

  const deleteWwwDirectory = `rm -r ${wwwDirectoryPath}`
  const deleteNginxConfFile = `rm ${nginxConfFilePath}`
  const deleteLinkedNginxConfFile = `rm ${nginxLinkedConfFilePath}`

  const result = await exec(`${deleteWwwDirectory} && ${deleteNginxConfFile} && ${deleteLinkedNginxConfFile} && ${restartNginxServiceCommand}`)
  return result
}

module.exports = {
  nginxConfGen,

  createNginxSite,
  updateNginxSite,
  deleteNginxSite
}
