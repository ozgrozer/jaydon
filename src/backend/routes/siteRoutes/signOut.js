const signOut = (req, res) => {
  const result = {
    success: false
  }

  delete req.session.isAuthenticated

  result.success = true
  res.json(result)
}

module.exports = signOut
