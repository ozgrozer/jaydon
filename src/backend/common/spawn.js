const { spawn } = require('child_process')

const _spawn = props => {
  return new Promise((resolve, reject) => {
    const { command, args } = props
    const child = spawn(command, args)
    let scriptOutput = ''

    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')

    child.stdout.on('data', data => {
      data = data.toString()
      scriptOutput += data
    })

    child.stderr.on('data', data => {
      data = data.toString()
      scriptOutput += data
    })

    child.on('exit', code => {
      resolve(scriptOutput)
    })
  })
}

module.exports = _spawn
