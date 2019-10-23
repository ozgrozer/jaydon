const defaults = {
  site: {
    port: 1148,
    name: 'Jaydon',
    dbName: 'jaydon',
    dbUrl: 'mongodb://127.0.0.1:27017/'
  },
  nginx: {
    dir: {
      core: '/etc/nginx',
      www: '/var/www'
    }
  }
}

module.exports = defaults
