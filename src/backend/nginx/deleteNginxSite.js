const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const restartNginxServiceCommand = require('./restartNginxServiceCommand')

const deleteNginxSite = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const nginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxLinkedConfigurationFilePath = `${defaults.nginx.dir.core}/sites-enabled/${domain}`

  const deleteWwwDirectory = `rm -r ${wwwDirectoryPath}`
  const deleteNginxConfigurationFile = `rm ${nginxConfigurationFilePath}`
  const deleteLinkedNginxConfigurationFile = `rm ${nginxLinkedConfigurationFilePath}`

  const result = await exec(`${deleteWwwDirectory} && ${deleteNginxConfigurationFile} && ${deleteLinkedNginxConfigurationFile} && ${restartNginxServiceCommand}`)
  return result
}

module.exports = deleteNginxSite
