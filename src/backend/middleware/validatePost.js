const validator = require('validator')
const validations = require.main.require('./../common/validations')

const camelCase = str => {
  return str.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase()
  })
}

const lowerCaseFirstLetter = str => {
  return str.charAt(0).toLowerCase() + str.substr(1)
}

const upperCaseFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

const validatePost = (req, res, next) => {
  let section
  let postBody

  if (req.body.meta) {
    section = req.body.meta.event + upperCaseFirstLetter(req.body.meta.category)

    postBody = req.body.data
  } else {
    section = camelCase(req.originalUrl.substr(1))
    section = lowerCaseFirstLetter(section)

    postBody = req.body
  }
  const totalValidations = Object.keys(validations[section]).length
  let howManyOfFormItemsAreValidated = 0
  const errorResult = {}

  Object.keys(postBody).map((name) => {
    const validation = validations[section][name]
      ? validations[section][name][0]
      : false
    const validate = validation
      ? validator[validation.rule](postBody[name], validation.args)
      : false
    if (validate) {
      howManyOfFormItemsAreValidated++
    } else {
      errorResult[name] = validation.invalidFeedback
    }
  })

  if (req.body.meta) {
    if (howManyOfFormItemsAreValidated === totalValidations) {
      return true
    } else {
      throw new Error('Validation error')
    }
  } else {
    if (howManyOfFormItemsAreValidated === totalValidations) {
      next()
    } else {
      res.json({
        success: false,
        error: 'Validation error'
      })
    }
  }
}

module.exports = validatePost
