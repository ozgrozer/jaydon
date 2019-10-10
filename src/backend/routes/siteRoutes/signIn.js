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

    const _dbGet = await dbGet({
      query: `
        select id from adminUsers
        where username='${req.body.username}' and password='${hashedPassword}'
      `
    })

    if (_dbGet.rows) {
      result.success = true
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

  /* req.session.isAuthenticated = true
  req.session.cookie.maxAge = 2592000000 */
}

module.exports = signIn
