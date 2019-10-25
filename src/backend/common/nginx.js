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

const nginxConfigurationGenerator = props => {
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

const indexHtmlContentGenerator = props => {
  const { domain } = props
  const result = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${domain}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
  <style>
    html, body { height: 100%; }
    body { text-align: center; font-family: Verdana; margin: 0; display: flex; align-items: center; justify-content: center; }
    h1 { color: #a4b0be; font-size: 60px; margin-top: 0; margin-bottom: 50px; }
    a { color: #70a1ff; font-size: 18px; text-decoration: none; }
  </style>
</head>
<body>
  <div>
    <h1>${domain}</h1>
    <a href="https://github.com/ozgrozer/jaydon" target="_blank">
      Powered by Jaydon
    </a>
  </div>
</body>
</html>
`

  return deleteFirstLine(result)
}

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

module.exports = {
  createNginxSite,
  updateNginxSite,
  deleteNginxSite
}
