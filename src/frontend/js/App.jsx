import 'babel-polyfill'
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, NavLink, Route, Redirect, Switch } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import './../css/style.scss'

import { MainContext, MainProvider } from './context/MainContext'

import SignIn from './auth/SignIn'
import ForgotPassword from './auth/ForgotPassword'

import DashboardHome from './dashboard/DashboardHome'
import Domains from './dashboard/Domains'
import CronJobs from './dashboard/CronJobs'

import NotFound from './other/NotFound'

const dashboardRoutes = {
  '/': {
    linkTitle: 'Dashboard',
    component: DashboardHome
  },
  '/domains': {
    linkTitle: 'Domains',
    component: Domains
  },
  '/cron-jobs': {
    linkTitle: 'Cron Jobs',
    component: CronJobs
  }
}

const Dashboard = () => {
  const { state, setState } = useContext(MainContext)

  const signOut = () => {
    axios
      .post('/sign-out')
      .then((res) => {
        if (res.data.success) {
          setState({
            isAuthenticated: false
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    (state.isAuthenticated ? (
      <div id='dashboard'>
        <div id='menu'>
          <div className='menuLinks'>
            {Object.keys(dashboardRoutes).map((path, key) => {
              const route = dashboardRoutes[path]
              const exact = path === '/'

              return (
                <NavLink
                  to={path}
                  key={key}
                  exact={exact}
                  activeClassName='active'
                >
                  {route.linkTitle}
                </NavLink>
              )
            })}
          </div>

          <div className='menuBottom'>
            <a
              target='_blank'
              className='versionLink'
              rel='noopener noreferrer'
              href='https://github.com/ozgrozer/jaydon'
            >
              {window.defaults.siteName} v{window.defaults.version}
            </a>

            <a
              onClick={signOut}
              className='signOutLink link'
            >
              <i className='icon icon-sign-out' />
            </a>
          </div>
        </div>

        <div id='main'>
          {Object.keys(dashboardRoutes).map((path) => {
            const route = dashboardRoutes[path]
            const exact = path === '/'

            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={route.component}
              />
            )
          })}
        </div>
      </div>
    ) : (
      <Redirect to={{ pathname: '/sign-in' }} />
    ))
  )
}

const Auth = () => {
  const { state } = useContext(MainContext)

  return (
    (!state.isAuthenticated ? (
      <div id='auth'>
        <Route path='/sign-in' component={SignIn} />
        <Route path='/forgot-password' component={ForgotPassword} />
      </div>
    ) : (
      <Redirect to={{ pathname: '/' }} />
    ))
  )
}

const Main = () => {
  return (
    <MainProvider>
      <ReactNotification />

      <BrowserRouter>
        <Switch>
          <Route path='/sign-in' component={Auth} />
          <Route path='/forgot-password' component={Auth} />

          {Object.keys(dashboardRoutes).map((path, key) => {
            const route = dashboardRoutes[path]
            const exact = path === '/'

            return (
              <Route
                key={key}
                path={path}
                exact={exact}
                component={Dashboard}
              />
            )
          })}

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MainProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
