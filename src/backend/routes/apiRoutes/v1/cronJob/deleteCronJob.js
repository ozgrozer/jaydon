const { deleteDocuments } = require.main.require('./db/db')

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

    result.success = true
    result.data = _deleteCronJobDocument
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = deleteCronJob
