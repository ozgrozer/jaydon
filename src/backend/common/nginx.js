const defaults = require.main.require('./defaults')
const exec = require.main.require('./common/exec')

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

const createWwwDirectory = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const result = await exec(`mkdir ${wwwDirectoryPath}`)
  return result
}

const deleteWwwDirectory = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const result = await exec(`rm -r ${wwwDirectoryPath}`)
  return result
}

const createNginxConfFile = async props => {
  const { domain } = props
  const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxConfFileContent = nginxConfGen({ domain })
  const result = await exec(`echo "${nginxConfFileContent}" > ${nginxConfFilePath}`)
  return result
}

const deleteNginxConfFile = async props => {
  const { domain } = props
  const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const result = await exec(`rm ${nginxConfFilePath}`)
  return result
}

module.exports = {
  nginxConfGen,
  createWwwDirectory,
  deleteWwwDirectory,
  createNginxConfFile,
  deleteNginxConfFile
}
