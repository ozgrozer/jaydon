const defaults = require.main.require('./defaults')

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

module.exports = {
  nginxConfGen
}
