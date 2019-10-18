const { updateWwwDirectory, updateNginxConfFile } = require.main.require('./common/nginx')
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

const updateDomainRow = async props => {
  const { id, domain } = props
  const updateRecord = await dbRun({
    query: 'update domains set domain=$domain, updatedAt=$updatedAt where id=$id',
    params: {
      $id: id,
      $domain: domain,
      $updatedAt: +new Date()
    }
  })
  return updateRecord
}

const updateDomain = async (req, res) => {
  const result = { success: false }

  try {
    const { id, domain } = req.body.data

    const oldDomain = await getDomain({ id })
    await updateWwwDirectory({
      oldDomain,
      newDomain: domain
    })
    await updateNginxConfFile({
      oldDomain,
      newDomain: domain
    })
    const _updateDomainRow = await updateDomainRow({ id, domain })

    result.success = true
    result.data = _updateDomainRow.data
    res.json(result)
  } catch (err) {
    result.error = err.error
    res.json(result)
  }
}

module.exports = updateDomain
