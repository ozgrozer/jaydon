const defaults = require.main.require('./defaults')
const fixContent = require('./fixContent')

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

  return fixContent(result)
}

module.exports = nginxConfigurationGenerator
