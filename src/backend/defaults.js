const defaults = {
  site: {
    port: 1148,
    language: 'en',
    name: 'Jaydon',
    dbName: 'jaydon'
  },
  nginx: {
    dir: {
      core: '/etc/nginx',
      www: '/var/www'
    }
  }
}

module.exports = defaults
