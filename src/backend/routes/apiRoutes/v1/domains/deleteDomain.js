const deleteDomain = async (req, res) => {
  const result = { success: false }

  try {
    result.success = true
    result.name = 'deleteDomain'
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = deleteDomain
