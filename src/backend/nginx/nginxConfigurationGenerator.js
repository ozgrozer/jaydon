const defaults = require.main.require('./defaults')
const fixContent = require('./fixContent')

const nginxConfigurationGenerator = props => {
  const { domain, ssl } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const sslDirectoryPath = `${defaults.letsencrypt.dir}/live/${domain}`

  let str = ''
  if (ssl) {
    str = `
      server {
        listen 80;
        server_name ${domain} www.${domain};

        # redirect
        return 301 https://${domain}$request_uri;
      }

      server {
        listen 443 ssl http2;
        server_name www.${domain};

        # ssl
        ssl_certificate ${sslDirectoryPath}/fullchain.pem;
        ssl_certificate_key ${sslDirectoryPath}/privkey.pem;

        # redirect
        return 301 https://${domain}$request_uri;
      }

      server {
        listen 443 ssl http2;
        server_name ${domain};
        root ${wwwDirectoryPath};

        # ssl
        ssl_certificate ${sslDirectoryPath}/fullchain.pem;
        ssl_certificate_key ${sslDirectoryPath}/privkey.pem;
      }
    `
  } else {
    str = `
      server {
        listen 80;
        server_name ${domain} www.${domain};
        root ${wwwDirectoryPath};
      }
    `
  }
  const spaces = 6

  return fixContent({ str, spaces })
}

module.exports = nginxConfigurationGenerator
