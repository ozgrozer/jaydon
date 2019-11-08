const os = require('os')

const exec = require.main.require('./common/exec')
const defaults = require.main.require('./defaults')
const { findDocuments } = require.main.require('./db/db')

const getAllCronJobs = async () => {
  const _findDocuments = await findDocuments({
    model: 'cronJobs',
    find: {}
  })
  return _findDocuments
}

const saveAllCronJobsToDisk = async props => {
  const _getAllCronJobs = await getAllCronJobs()

  const osUsername = os.userInfo().username
  const cronDir = defaults.cron.dir
  const cronFilePath = `${cronDir}/${osUsername}`

  const lines = []
  Object.keys(_getAllCronJobs).map(key => {
    const cronJob = _getAllCronJobs[key]
    const { schedule, command } = cronJob
    const cronJobLine = `${schedule} ${osUsername} ${command}`
    lines.push(cronJobLine)
  })
  const cronFileContent = lines.join('\n')

  const creteFile = await exec(`echo "${cronFileContent}" > ${cronFilePath}`)
  return creteFile
}

module.exports = saveAllCronJobsToDisk
