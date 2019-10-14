import 'babel-polyfill'
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, NavLink, Route, Redirect, Switch } from 'react-router-dom'

import './../css/style.scss'

import { MainContext, MainProvider } from './context/MainContext'

import SignIn from './auth/SignIn'
import ForgotPassword from './auth/ForgotPassword'

import Dashboard from './dashboard/Dashboard'
import Domains from './dashboard/Domains'

import NotFound from './other/NotFound'

const routes = {
  '/': {
    title: 'Dashboard',
    component: Dashboard
  },
  '/domains': {
    title: 'Domains',
    component: Domains
  }
}

const App = () => {
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
          {Object.keys(routes).map((path) => {
            const route = routes[path]
            const exact = path === '/'

            return (
              <NavLink
                to={path}
                key={path}
                exact={exact}
                activeClassName='active'
              >
                {route.title}
              </NavLink>
            )
          })}
          <a onClick={signOut} className='link'>Sign Out</a>
        </div>

        <div id='main'>
          {Object.keys(routes).map((path) => {
            const route = routes[path]
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
      <BrowserRouter>
        <Switch>
          <Route path='/sign-in' component={Auth} />} />
          <Route path='/forgot-passwords' component={Auth} />} />

          <Route path='/' exact component={App} />} />
          <Route path='/domains' component={App} />} />

          <Route component={NotFound} />} />
        </Switch>
      </BrowserRouter>
    </MainProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
