const createModel = require('./createModel')

module.exports = {
  adminUsers: createModel({ name: 'adminUsers' }),
  domains: createModel({ name: 'domains' })
}
