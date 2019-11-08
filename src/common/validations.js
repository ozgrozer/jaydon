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
  ],
  command: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a command'
    }
  ],
  schedule: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a schedule'
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
  },

  createCronJob: {
    command: premade.command,
    schedule: premade.schedule
  },
  readCronJob: {
  },
  updateCronJob: {
    id: premade.id,
    command: premade.command,
    schedule: premade.schedule
  },
  deleteCronJob: {
    id: premade.id
  }
}

module.exports = validations
