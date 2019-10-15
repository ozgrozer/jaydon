const premade = {
  username: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a username'
    }
  ],
  password: [
    {
      rule: 'isLength',
      args: { min: 4 },
      invalidFeedback: 'Password must be at least 4 characters'
    }
  ],
  domain: [
    {
      rule: 'isURL',
      args: { protocols: [] },
      invalidFeedback: 'Please provide a valid domain'
    }
  ]
}

const validations = {
  signIn: {
    username: premade.username,
    password: premade.password
  },

  createDomains: {
    domain: premade.domain
  },
  editDomains: {
    domain: premade.domain
  }
}

module.exports = validations
