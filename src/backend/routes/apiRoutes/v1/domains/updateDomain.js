const updateDomain = async (req, res) => {
  const result = { success: false }

  try {
    result.success = true
    result.name = 'updateDomain'
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = updateDomain
