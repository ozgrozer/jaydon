const { findDocuments } = require.main.require('./db/db')
const validatePost = require.main.require('./middleware/validatePost')

const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

const connectApi = async props => {
  const result = { success: false }

  const categories = ['domain', 'cronJob']
  const events = ['create', 'read', 'update', 'delete']

  const { apiKey, category, event, version } = props.meta
  const data = props.data
  const { req, res, next } = props.express

  req.body.data = data

  try {
    const findApiKeys = await findDocuments({
      model: 'adminUsers',
      find: { apiKey },
      select: 'apiKey'
    })

    if (!Object.keys(findApiKeys).length) {
      throw new Error('API key couldn\'t found')
    }

    if (categories.indexOf(category) === -1) {
      throw new Error('Category couldn\'t found')
    }

    if (events.indexOf(event) === -1) {
      throw new Error('Event couldn\'t found')
    }

    const categoryUcFirst = ucFirst(category)

    validatePost(req, res, next)

    const requirePath = `./routes/apiRoutes/v${version}/${category}/${event}${categoryUcFirst}`
    const requiredEvent = require.main.require(requirePath)
    requiredEvent(req, res)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = connectApi
