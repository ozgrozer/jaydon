const createNginxSite = require('./createNginxSite')
const updateNginxSite = require('./updateNginxSite')
const deleteNginxSite = require('./deleteNginxSite')
const createGitSupport = require('./createGitSupport')
const deleteGitSupport = require('./deleteGitSupport')

module.exports = {
  createNginxSite,
  updateNginxSite,
  deleteNginxSite,
  createGitSupport,
  deleteGitSupport
}
