const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const fixContent = require('./fixContent')

const updateGitSupport = async props => {
  const { oldDomain, newDomain } = props
  const oldBareDirectoryPath = `${defaults.git.dir.bare}/${oldDomain}.git`
  const newBareDirectoryPath = `${defaults.git.dir.bare}/${newDomain}.git`
  const newWwwDirectoryPath = `${defaults.git.dir.www}/${newDomain}`

  const newPostUpdateFilePath = `${newBareDirectoryPath}/hooks/post-update`
  const _newPostUpdateFileContent = `
    #!/bin/sh

    echo
    echo "*** Pulling changes into Live"
    echo

    cd ${newWwwDirectoryPath} || exit
    unset GIT_DIR
    git pull hub master

    exec git-update-server-info
  `
  const newPostUpdateFileContent = fixContent({
    str: _newPostUpdateFileContent,
    spaces: 4
  })

  const commands = [
    `mv ${oldBareDirectoryPath} ${newBareDirectoryPath}`,
    `echo '${newPostUpdateFileContent}' > ${newPostUpdateFilePath}`,
    `cd ${newWwwDirectoryPath}`,
    `git remote set-url hub ${newBareDirectoryPath}`
  ]

  const joinCommands = commands.join(' && ')
  const result = await exec(joinCommands)
  return result
}

module.exports = updateGitSupport
