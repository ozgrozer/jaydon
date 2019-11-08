const { findDocuments } = require.main.require('./db/db')

const readCronJob = async (req, res) => {
  const result = { success: false }

  try {
    const { data } = req.body

    const ifIdExists = Object.prototype.hasOwnProperty.call(data, 'id')
    const find = ifIdExists ? { _id: data.id } : {}
    const _findCronJobs = await findDocuments({
      model: 'cronJobs',
      find,
      sort: { _id: -1 }
    })

    if (ifIdExists) {
      result.data = _findCronJobs[0]
    } else {
      result.data = _findCronJobs
    }

    result.success = true
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = readCronJob
