const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const indexHtmlContentGenerator = require('./indexHtmlContentGenerator')
const nginxConfigurationGenerator = require('./nginxConfigurationGenerator')
const restartNginxServiceCommand = require('./restartNginxServiceCommand')

const createNginxSite = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const indexHtmlFileContent = indexHtmlContentGenerator({ domain })
  const nginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxConfigurationFileContent = nginxConfigurationGenerator({ domain })
  const nginxLinkedConfigurationFolderPath = `${defaults.nginx.dir.core}/sites-enabled/`

  const createWwwDirectory = `mkdir ${wwwDirectoryPath}`
  const createWwwIndexFile = `echo "${indexHtmlFileContent}" > ${wwwDirectoryPath}/index.html`
  const createNginxConfigurationFile = `echo "${nginxConfigurationFileContent}" > ${nginxConfigurationFilePath}`
  const linkNginxConfigurationFile = `ln -s ${nginxConfigurationFilePath} ${nginxLinkedConfigurationFolderPath}`

  const result = await exec(`${createWwwDirectory} && ${createWwwIndexFile} && ${createNginxConfigurationFile} && ${linkNginxConfigurationFile} && ${restartNginxServiceCommand}`)
  return result
}

module.exports = createNginxSite
