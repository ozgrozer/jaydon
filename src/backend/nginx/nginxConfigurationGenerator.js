const defaults = require.main.require('./defaults')
const fixContent = require('./fixContent')

const nginxConfigurationGenerator = props => {
  const { domain } = props
  const domainDirectory = `${defaults.nginx.dir.www}/${domain}`

  const str = `
    server {
      listen 80;
      server_name ${domain} www.${domain};
      root ${domainDirectory};
    }
  `
  const spaces = 4

  return fixContent({ str, spaces })
}

module.exports = nginxConfigurationGenerator
