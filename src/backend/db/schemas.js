const schemas = {
  adminUsers: {
    username: { type: String, required: true },
    password: { type: String, required: true },
    apiKey: { type: String, required: true }
  },
  domains: {
    domain: { type: String, required: true },
    gitSupport: { type: Boolean }
  }
}

module.exports = schemas
