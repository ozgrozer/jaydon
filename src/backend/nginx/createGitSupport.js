const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')
const fixContent = require('./fixContent')

const createGitSupport = async props => {
  try {
    const { domain } = props
    const bareDirectoryPath = `${defaults.git.dir.bare}/${domain}.git`
    const wwwDirectoryPath = `${defaults.git.dir.www}/${domain}`

    const postUpdateFilePath = `${bareDirectoryPath}/hooks/post-update`
    const postCommitFilePath = `${wwwDirectoryPath}/.git/hooks/post-commit`
    const _postUpdateFileContent = `
      #!/bin/sh

      echo
      echo "*** Pulling changes into Live"
      echo

      cd ${wwwDirectoryPath} || exit
      unset GIT_DIR
      git pull hub master

      exec git-update-server-info
    `
    const _postCommitFileContent = `
      #!/bin/sh

      echo
      echo "*** Pushing changes to Hub"
      echo

      git push hub
    `
    const postUpdateFileContent = fixContent({
      str: _postUpdateFileContent,
      spaces: 4
    })
    const postCommitFileContent = fixContent({
      str: _postCommitFileContent,
      spaces: 4
    })

    const commands = [
      `mkdir -p ${bareDirectoryPath}`,
      `cd ${bareDirectoryPath}`,
      'git init --bare',

      `mkdir -p ${wwwDirectoryPath}`,
      `cd ${wwwDirectoryPath}`,
      'git init',
      `git remote add hub ${bareDirectoryPath}`,

      `touch ${postUpdateFilePath}`,
      `echo '${postUpdateFileContent}' > ${postUpdateFilePath}`,
      `chmod +x ${postUpdateFilePath}`,

      `touch ${postCommitFilePath}`,
      `echo '${postCommitFileContent}' > ${postCommitFilePath}`,
      `chmod +x ${postCommitFilePath}`,

      'git add .',
      'git commit -m "Initial commit."',
      'git push --set-upstream hub master'
    ]

    const joinCommands = commands.join(' && ')
    const result = await exec(joinCommands)
    return result
  } catch (e) {
    return e.message
  }
}

module.exports = createGitSupport
