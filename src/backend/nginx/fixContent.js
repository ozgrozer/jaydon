const fixContent = props => {
  const { str, spaces } = props
  const lines = str.split('\n')
  const totalLines = lines.length
  lines.splice(totalLines - 1, 1)
  lines.splice(0, 1)
  const newLines = lines.map(line => line.substr(spaces))
  const joinLines = newLines.join('\n')
  return joinLines
}

module.exports = fixContent
