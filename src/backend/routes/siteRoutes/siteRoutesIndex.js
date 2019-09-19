const defaults = require.main.require('./defaults')

const siteRoutesIndex = async (req, res) => {
  try {
    const routes = {
      '/': {
        title: defaults.site.name
      },
      '/users': {
        title: `Users - ${defaults.site.name}`
      },
      '/domains': {
        title: `Domains - ${defaults.site.name}`
      },
      '/databases': {
        title: `Databases - ${defaults.site.name}`
      },
      '/dns': {
        title: `DNS - ${defaults.site.name}`
      },
      '/ssl': {
        title: `SSL - ${defaults.site.name}`
      },
      '/cron': {
        title: `Cron - ${defaults.site.name}`
      },
      '/logs': {
        title: `Logs - ${defaults.site.name}`
      },
      '/monitor': {
        title: `Monitor - ${defaults.site.name}`
      },
      '/apis': {
        title: `APIs - ${defaults.site.name}`
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

    res.render('app', {
      defaults: {
        routes,
        activePageTitle,
        siteName: defaults.site.name,
        language: defaults.site.language,
        isAuthenticated: req.session.isAuthenticated || false
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = siteRoutesIndex
