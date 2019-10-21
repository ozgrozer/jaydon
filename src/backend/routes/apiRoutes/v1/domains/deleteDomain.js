const { deleteNginxSite } = require.main.require('./common/nginx')
const { dbRun, dbGet } = require.main.require('./db/db')

const getDomain = async props => {
  const { id } = props
  const getDomain = await dbGet({
    query: `
      select domain from domains
      where id='${id}'
    `
  })
  const domain = getDomain.row.domain
  return domain
}

const deleteDomainRow = async props => {
  const { id } = props
  const deleteRecord = await dbRun({
    query: 'delete from domains where id=$id',
    params: {
      $id: id
    }
  })
  return deleteRecord
}

const deleteDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { id } = req.body.data

    const domain = await getDomain({ id })
    await deleteNginxSite({ domain })
    const _deleteDomainRow = await deleteDomainRow({ id })

    result.success = true
    result.data = _deleteDomainRow.data
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = deleteDomain
