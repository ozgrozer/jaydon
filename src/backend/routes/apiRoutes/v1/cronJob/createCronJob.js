const { newDocument } = require.main.require('./db/db')
const saveAllCronJobsToDisk = require('./saveAllCronJobsToDisk')

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
    const { command, schedule } = req.body.data

    const newDocumentData = { command, schedule }
    const _newCronJobDocument = await newCronJobDocument(newDocumentData)
    result.data = _newCronJobDocument

    await saveAllCronJobsToDisk()

    result.success = true
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createCronJob
