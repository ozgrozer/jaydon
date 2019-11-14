const { spawn } = require('child_process')

const _spawn = props => {
  return new Promise((resolve, reject) => {
    const { command, args } = props
    const child = spawn(command, args)
    const combineStdOuts = []

    child.stdout.on('data', data => {
      combineStdOuts.push(data)
    })

    child.stderr.on('data', data => {
      reject(data)
    })

    child.on('close', code => {
      resolve(combineStdOuts.join('\n'))
    })
  })
}

module.exports = _spawn
