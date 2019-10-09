const signIn = (req, res) => {
  const result = {
    success: false
  }

  /* req.session.isAuthenticated = true
  req.session.cookie.maxAge = 2592000000 */

  result.success = true
  res.json(result)
}

module.exports = signIn
