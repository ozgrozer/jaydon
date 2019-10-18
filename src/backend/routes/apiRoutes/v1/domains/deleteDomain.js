const exec = require.main.require('./common/exec')
const defaults = require.main.require('./defaults')
const { dbRun, dbGet } = require.main.require('./db/db')

const deleteDomain = async (req, res) => {
  const result = { success: false }
  const { data } = req.body

  try {
    const getDomain = await dbGet({
      query: `
        select domain from domains
        where id='${data.id}'
      `
    })
    const domain = getDomain.row.domain

    const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
    await exec(`rm -r ${wwwDirectoryPath}`)

    const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
    await exec(`rm ${nginxConfFilePath}`)

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
    result.error = err.message
    res.json(result)
  }
}

module.exports = deleteDomain
