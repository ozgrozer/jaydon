const exec = require.main.require('./common/exec')
const { nginxConfGen } = require.main.require('./common/nginx')
const defaults = require.main.require('./defaults')
const { dbRun } = require.main.require('./db/db')

const createDomain = async (req, res) => {
  const result = { success: false }
  const { data } = req.body
  const { domain } = data

  try {
    const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
    await exec(`mkdir ${wwwDirectoryPath}`)

    const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
    const nginxConfFileContent = nginxConfGen({ domain: domain })
    await exec(`echo "${nginxConfFileContent}" > ${nginxConfFilePath}`)

    const _createDomain = await dbRun({
      query: 'insert into domains(domain, createdAt) values($domain, $createdAt)',
      params: {
        $domain: domain,
        $createdAt: +new Date()
      }
    })

    result.success = true
    result.data = _createDomain.data
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createDomain
