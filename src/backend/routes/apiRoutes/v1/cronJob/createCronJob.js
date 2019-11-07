const { newDocument } = require.main.require('./db/db')

const newCronJobDocument = async data => {
  const _newDocument = await newDocument({
    model: 'cronJobs',
    data
  })
  return _newDocument
}

const createCronJob = async (req, res) => {
  const result = { success: false }

  try {
    const { command, interval } = req.body.data

    const newDocumentData = {
      command,
      interval
    }

    const _newCronJobDocument = await newCronJobDocument(newDocumentData)

    result.success = true
    result.data = _newCronJobDocument
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createCronJob
