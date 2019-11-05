const createNginxSite = require('./createNginxSite')
const updateNginxSite = require('./updateNginxSite')
const deleteNginxSite = require('./deleteNginxSite')

const createGitSupport = require('./createGitSupport')
const updateGitSupport = require('./updateGitSupport')
const deleteGitSupport = require('./deleteGitSupport')

const createSslSupport = require('./createSslSupport')
const updateSslSupport = require('./updateSslSupport')
const deleteSslSupport = require('./deleteSslSupport')

module.exports = {
  createNginxSite,
  updateNginxSite,
  deleteNginxSite,

  createGitSupport,
  updateGitSupport,
  deleteGitSupport,

  createSslSupport,
  updateSslSupport,
  deleteSslSupport
}
