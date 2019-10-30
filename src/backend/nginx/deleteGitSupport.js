const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')

const deleteGitSupport = async props => {
  const { domain } = props
  const bareDirectoryPath = `${defaults.git.dir.bare}/${domain}.git`
  const wwwDirectoryPath = `${defaults.git.dir.www}/${domain}/.git`

  const commands = [
    `rm -r ${bareDirectoryPath}`,
    `rm -r ${wwwDirectoryPath}`
  ]

  const joinCommands = commands.join(' && ')
  const result = await exec(joinCommands)
  return result
}

module.exports = deleteGitSupport
