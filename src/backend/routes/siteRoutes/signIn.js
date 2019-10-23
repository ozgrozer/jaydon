const crypto = require('crypto')

const { findDocuments } = require.main.require('./db/db')

const signIn = async (req, res) => {
  const result = {
    success: false,
    validations: {}
  }

  try {
    const username = req.body.username
    const password = crypto
      .createHash('sha256')
      .update(req.body.password)
      .digest('hex')

    const findUsers = await findDocuments({
      model: 'adminUsers',
      find: {
        username,
        password
      },
      select: 'apiKey'
    })

    if (Object.keys(findUsers).length) {
      const foundUser = findUsers[0]

      result.success = true

      req.session.isAuthenticated = true
      req.session.authenticatedUserApiKey = foundUser.apiKey

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
