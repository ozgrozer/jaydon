const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const restartNginxServiceCommand = require('./restartNginxServiceCommand')

const deleteNginxSite = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const nginxConfigurationFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxLinkedConfigurationFilePath = `${defaults.nginx.dir.core}/sites-enabled/${domain}`

  const commands = [
    `rm -r ${wwwDirectoryPath}`,
    `rm ${nginxConfigurationFilePath}`,
    `rm ${nginxLinkedConfigurationFilePath}`,
    restartNginxServiceCommand
  ]

  const joinCommands = commands.join(' && ')
  const result = await exec(joinCommands)
  return result
}

module.exports = deleteNginxSite
