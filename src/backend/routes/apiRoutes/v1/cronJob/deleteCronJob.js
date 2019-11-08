const { deleteDocuments } = require.main.require('./db/db')
const saveAllCronJobsToDisk = require('./saveAllCronJobsToDisk')

const deleteCronJobDocument = async props => {
  const { id } = props
  const _deleteDocument = await deleteDocuments({
    model: 'cronJobs',
    select: { _id: id }
  })
  return _deleteDocument
}

const deleteCronJob = async (req, res) => {
  const result = { success: false }

  try {
    const { id } = req.body.data

    const _deleteCronJobDocument = await deleteCronJobDocument({ id })
    result.data = _deleteCronJobDocument

    await saveAllCronJobsToDisk()

    result.success = true
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = deleteCronJob
