const exec = require.main.require('./common/exec')
const { nginxConfGen } = require.main.require('./common/nginx')
const defaults = require.main.require('./defaults')
const { dbRun } = require.main.require('./db/db')

const createWwwDirectory = async props => {
  const { domain } = props
  const wwwDirectoryPath = `${defaults.nginx.dir.www}/${domain}`
  const result = await exec(`mkdir ${wwwDirectoryPath}`)
  return result
}

const createNginxConfFile = async props => {
  const { domain } = props
  const nginxConfFilePath = `${defaults.nginx.dir.core}/sites-available/${domain}`
  const nginxConfFileContent = nginxConfGen({ domain })
  const result = await exec(`echo "${nginxConfFileContent}" > ${nginxConfFilePath}`)
  return result
}

const createDomainRow = async props => {
  const { domain } = props
  const createRecord = await dbRun({
    query: 'insert into domains(domain, createdAt) values($domain, $createdAt)',
    params: {
      $domain: domain,
      $createdAt: +new Date()
    }
  })
  return createRecord
}

const createDomain = async (req, res) => {
  const result = { success: false }
  const { domain } = req.body.data

  try {
    await createWwwDirectory({ domain })
    await createNginxConfFile({ domain })
    const _createDomainRow = await createDomainRow({ domain })

    result.success = true
    result.data = _createDomainRow.data
    res.json(result)
  } catch (err) {
    result.error = err.message
    res.json(result)
  }
}

module.exports = createDomain
