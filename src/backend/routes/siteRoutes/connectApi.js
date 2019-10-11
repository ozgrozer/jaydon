const connectApi = (req, res) => {
  const result = { success: false }

  result.success = true
  res.json(result)
}

module.exports = connectApi
