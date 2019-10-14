const { dbRun } = require.main.require('./db/db')

const deleteDomain = async (req, res) => {
  const result = { success: false }
  const { data } = req.body

  try {
    const _deleteDomain = await dbRun({
      query: 'delete from domains where id=$id',
      params: {
        $id: data.id
      }
    })

    result.success = true
    result.data = _deleteDomain.data
    res.json(result)
  } catch (err) {
    result.error = err.error
    res.json(result)
  }
}

module.exports = deleteDomain
