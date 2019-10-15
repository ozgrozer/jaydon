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

const validatePost = (req, res, next) => {
  let section
  if (req.body.controllerName) {
    section = req.body.controllerName
  } else {
    section = camelCase(req.originalUrl.substr(1))
    section = lowerCaseFirstLetter(section)
  }
  const totalValidations = Object.keys(validations[section]).length
  let howManyOfFormItemsAreValidated = 0
  const errorResult = {}

  Object.keys(req.body).map((name) => {
    const validation = validations[section][name]
      ? validations[section][name][0]
      : false
    const validate = validation
      ? validator[validation.rule](req.body[name], validation.args)
      : false
    if (validate) {
      howManyOfFormItemsAreValidated++
    } else {
      errorResult[name] = validation.invalidFeedback
    }
  })

  if (howManyOfFormItemsAreValidated === totalValidations) {
    next()
  } else {
    res.json({
      success: false,
      error: 'Validation error'
    })
  }
}

module.exports = validatePost
