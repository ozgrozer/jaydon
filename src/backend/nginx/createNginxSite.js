const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const indexHtmlContentGenerator = require('./indexHtmlContentGenerator')
const nginxConfigurationGenerator = require('./nginxConfigurationGenerator')
const restartNginxServiceCommand = require('./restartNginxServiceCommand')

const createNginxSite = async props => {
  const { domain, nginxConf } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const indexHtmlFileContent = indexHtmlContentGenerator({ domain })
  const nginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxConfigurationFileContent = nginxConf || nginxConfigurationGenerator({ domain })
  const nginxConfigurationFileContentEscape = nginxConfigurationFileContent.replace(/\$/g, '\\$')
  const nginxLinkedConfigurationFolderPath = `${defaults.nginx.dir.core}/sites-enabled/`

  const commands = [
    `mkdir ${wwwDirectoryPath}`,
    `echo "${indexHtmlFileContent}" > ${wwwDirectoryPath}/index.html`,
    `echo "${nginxConfigurationFileContentEscape}" > ${nginxConfigurationFilePath}`,
    `ln -s ${nginxConfigurationFilePath} ${nginxLinkedConfigurationFolderPath}`,
    restartNginxServiceCommand
  ]

  const joinCommands = commands.join(' && ')
  const result = await exec(joinCommands)
  return result
}

module.exports = createNginxSite
