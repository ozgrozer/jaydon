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
  },
  git: {
    dir: {
      bare: '/var/git',
      www: '/var/www'
    }
  },
  cron: {
    dir: '/etc/cron.d'
  },
  letsencrypt: {
    dir: '/etc/letsencrypt'
  }
}

module.exports = defaults
