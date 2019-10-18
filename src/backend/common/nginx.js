const defaults = require.main.require('./defaults')

const nginxConfGen = props => {
  const domainDirectory = `${defaults.nginx.dir.www}/${props.domain}`

  const result = `
server {
  listen 80;
  server_name ${props.domain};
  root ${domainDirectory};
}
  `

  return result
}

module.exports = {
  nginxConfGen
}
