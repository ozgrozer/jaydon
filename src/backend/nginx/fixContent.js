const fixContent = str => {
  const lines = str.split('\n')
  lines.splice(0, 1)
  const joinLines = lines.join('\n')
  return joinLines
}

module.exports = fixContent
