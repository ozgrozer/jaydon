const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const nginxConfigurationGenerator = require('./nginxConfigurationGenerator')
const restartNginxServiceCommand = require('./restartNginxServiceCommand')

const updateNginxSite = async props => {
  const { oldDomain, newDomain } = props
  const oldWwwDirectoryPath = `${defaults.nginx.dir.www}/${oldDomain}`
  const newWwwDirectoryPath = `${defaults.nginx.dir.www}/${newDomain}`
  const oldNginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-available/${oldDomain}`
  const oldLinkedNginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-enabled/${oldDomain}`
  const nginxConfigurationFileContent = nginxConfigurationGenerator({ domain: newDomain })
  const nginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-available/${newDomain}`
  const nginxLinkedConfigurationFolderPath = `${defaults.nginx.dir.core}/sites-enabled/`

  const updateWwwDirectory = `mv ${oldWwwDirectoryPath} ${newWwwDirectoryPath}`
  const deleteOldNginxConfigurationFile = `rm ${oldNginxConfigurationFilePath}`
  const deleteOldLinkedNginxConfigurationFile = `rm ${oldLinkedNginxConfigurationFilePath}`
  const createNginxConfigurationFile = `echo "${nginxConfigurationFileContent}" > ${nginxConfigurationFilePath}`
  const linkNginxConfigurationFile = `ln -s ${nginxConfigurationFilePath} ${nginxLinkedConfigurationFolderPath}`

  const result = await exec(`${updateWwwDirectory} && ${deleteOldNginxConfigurationFile} && ${deleteOldLinkedNginxConfigurationFile} && ${createNginxConfigurationFile} && ${linkNginxConfigurationFile} && ${restartNginxServiceCommand}`)
  return result
}

module.exports = updateNginxSite
