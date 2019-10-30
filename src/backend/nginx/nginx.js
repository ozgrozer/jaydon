const createNginxSite = require('./createNginxSite')
const updateNginxSite = require('./updateNginxSite')
const deleteNginxSite = require('./deleteNginxSite')

const createGitSupport = require('./createGitSupport')
const updateGitSupport = require('./updateGitSupport')
const deleteGitSupport = require('./deleteGitSupport')

module.exports = {
  createNginxSite,
  updateNginxSite,
  deleteNginxSite,

  createGitSupport,
  updateGitSupport,
  deleteGitSupport
}
