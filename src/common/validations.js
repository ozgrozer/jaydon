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
  id: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide an ID'
    }
  ],
  domain: [
    {
      rule: 'isURL',
      args: { protocols: [] },
      invalidFeedback: 'Please provide a valid domain'
    }
  ],
  checkbox: [
    {
      rule: 'equals',
      args: 'on',
      invalidFeedback: 'Please check'
    }
  ]
}

const validations = {
  signIn: {
    username: premade.username,
    password: premade.password
  },

  createDomain: {
    domain: premade.domain
  },
  readDomain: {
  },
  updateDomain: {
    id: premade.id,
    domain: premade.domain
  },
  deleteDomain: {
    id: premade.id
  }
}

module.exports = validations
