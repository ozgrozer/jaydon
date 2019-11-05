const schemas = {
  adminUsers: {
    username: { type: String, required: true },
    password: { type: String, required: true },
    apiKey: { type: String, required: true }
  },
  domains: {
    domain: { type: String, required: true },
    gitSupport: { type: Boolean },
    sslSupport: { type: Boolean }
  },
  settings: {
    key: { type: String },
    value: { type: Object }
  }
}

module.exports = schemas
