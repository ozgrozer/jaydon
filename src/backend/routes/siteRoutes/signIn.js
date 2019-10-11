const crypto = require('crypto')

const { dbGet } = require.main.require('./db/db')

const signIn = async (req, res) => {
  const result = {
    success: false,
    validations: {}
  }

  try {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(req.body.password)
      .digest('hex')

    const getUser = await dbGet({
      query: `
        select apiKey from adminUsers
        where username='${req.body.username}' and password='${hashedPassword}'
      `
    })

    if (getUser.row) {
      result.success = true

      req.session.isAuthenticated = true
      req.session.authenticatedUserApiKey = getUser.row.apiKey

      if (req.body.rememberMe === 'on') {
        // cookie expires after 30 days (30 * 24 * 60 * 60 * 1000)
        req.session.cookie.maxAge = 2592000000
      } else {
        // cookie expires at the end of the session
        req.session.cookie.expires = false
      }
    } else {
      result.error = 'User couldn\'t found'
      result.validations.username = result.error
    }

    res.json(result)
  } catch (err) {
    console.log(err)
    result.error = err.message
    res.json(result)
  }
}

module.exports = signIn
