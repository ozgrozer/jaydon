const os = require('os')

const restartNginxServiceCommand = () => {
  const osType = os.type()
  const result = osType === 'Darwin'
    ? 'brew services restart nginx'
    : 'service nginx restart'
  return result
}

module.exports = restartNginxServiceCommand()
