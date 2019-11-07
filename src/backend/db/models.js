const createModel = require('./createModel')

module.exports = {
  adminUsers: createModel({ name: 'adminUsers' }),
  settings: createModel({ name: 'settings' }),
  domains: createModel({ name: 'domains' }),
  cronJobs: createModel({ name: 'cronJobs' })
}
