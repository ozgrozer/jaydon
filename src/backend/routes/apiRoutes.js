const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const router = express.Router()
router.use(express.json())
router.use(helmet())
router.use(cors())

const { dbGet } = require.main.require('./db/db')

const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1)
const removeLast = str => str.substring(0, str.length - 1)

router.post('/v1', async (req, res) => {
  const result = { success: false }

  const categories = ['domains']
  const events = ['create', 'read', 'update', 'delete']

  const { apiKey, category, event } = req.body

  try {
    const checkApiKey = await dbGet({
      query: `
        select apiKey from adminUsers
        where apiKey='${apiKey}'
      `
    })

    if (!checkApiKey.rows) {
      throw new Error('API key couldn\'t found')
    }

    if (categories.indexOf(category) === -1) {
      throw new Error('Category couldn\'t found')
    }

    if (events.indexOf(event) === -1) {
      throw new Error('Event couldn\'t found')
    }

    const categoryRemoveLast = removeLast(category)
    const categoryUcFirst = ucFirst(categoryRemoveLast)

    const requirePath = `./apiRoutes/v1/${category}/${event}${categoryUcFirst}`
    const requiredEvent = require(requirePath)
    requiredEvent(req, res)
  } catch (err) {
    result.error = err.message
    res.send(result)
  }
})

module.exports = router
