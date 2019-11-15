const defaults = require.main.require('./defaults')
const packageJson = require.main.require('./../../package.json')
const parsePackageJson = JSON.parse(JSON.stringify(packageJson))

const siteRoutesIndex = async (req, res) => {
  try {
    const routes = {
      '/': {
        title: defaults.site.name
      },
      '/domains': {
        title: `Domains - ${defaults.site.name}`
      },
      '/cron-jobs': {
        title: `Cron Jobs - ${defaults.site.name}`
      },

      '/sign-in': {
        title: `Sign In - ${defaults.site.name}`
      },
      '/forgot-password': {
        title: `Forgot Password - ${defaults.site.name}`
      },

      '/not-found': {
        title: `Not Found - ${defaults.site.name}`
      }
    }

    const url = req.originalUrl
    const activePageTitle = Object.prototype.hasOwnProperty.call(routes, url)
      ? routes[url].title
      : defaults.site.name

    const version = parsePackageJson.version

    res.render('app', {
      defaults: {
        routes,
        version,
        activePageTitle,
        siteName: defaults.site.name,
        isAuthenticated: req.session.isAuthenticated || false
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = siteRoutesIndex
