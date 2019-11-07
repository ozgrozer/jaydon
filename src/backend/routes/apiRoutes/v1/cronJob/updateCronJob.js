const { updateDocument } = require.main.require('./db/db')

const updateCronJobDocument = async props => {
  const { id, data } = props
  const _updateDocument = await updateDocument({
    model: 'cronJobs',
    query: { _id: id },
    data
  })
  return _updateDocument
}

const updateCronJob = async (req, res) => {
  const result = { success: false }

  try {
    const { data } = req.body
    const { id, command, interval } = data

    const updateDocumentData = {
      command: command,
      interval: interval
    }
    const _updateCronJobDocument = await updateCronJobDocument({
      id,
      data: updateDocumentData
    })

    result.success = true
    result.data = _updateCronJobDocument
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = updateCronJob
