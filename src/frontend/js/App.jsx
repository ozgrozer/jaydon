import React, { useContext, Fragment } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, NavLink, Route, Redirect, Switch } from 'react-router-dom'

import './../css/style.scss'

import { MainContext, MainProvider } from './context/MainContext'

import Dashboard from './dashboard/Dashboard'
import Users from './dashboard/Users'
import Domains from './dashboard/Domains'
import Databases from './dashboard/Databases'
import Dns from './dashboard/Dns'
import Ssl from './dashboard/Ssl'
import Cron from './dashboard/Cron'
import Logs from './dashboard/Logs'
import Monitor from './dashboard/Monitor'
import Apis from './dashboard/Apis'

import SignIn from './auth/SignIn'
import ForgotPassword from './auth/ForgotPassword'

import NotFound from './other/NotFound'

const App = () => {
  const [state, setState] = useContext(MainContext)

  const signOut = () => {
    axios
      .post('/sign-out')
      .then((res) => {
        if (res.data.success) {
          setState((state) => ({
            ...state,
            isAuthenticated: false
          }))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    (state.isAuthenticated ? (
      <div id='app'>
        <div id='menu'>
          <NavLink to='/' exact activeClassName='active'>Dashboard</NavLink>
          <NavLink to='/users' activeClassName='active'>Users</NavLink>
          <NavLink to='/domains' activeClassName='active'>Domains</NavLink>
          <NavLink to='/databases' activeClassName='active'>Databases</NavLink>
          <NavLink to='/dns' activeClassName='active'>DNS</NavLink>
          <NavLink to='/ssl' activeClassName='active'>SSL</NavLink>
          <NavLink to='/cron' activeClassName='active'>Cron</NavLink>
          <NavLink to='/logs' activeClassName='active'>Logs</NavLink>
          <NavLink to='/monitor' activeClassName='active'>Monitor</NavLink>
          <NavLink to='/apis' activeClassName='active'>APIs</NavLink>
          <a onClick={signOut} className='link'>Sign Out</a>
        </div>

        <div id='main'>
          <Route path='/' exact component={Dashboard} />
          <Route path='/users' component={Users} />
          <Route path='/domains' component={Domains} />
          <Route path='/databases' component={Databases} />
          <Route path='/dns' component={Dns} />
          <Route path='/ssl' component={Ssl} />
          <Route path='/cron' component={Cron} />
          <Route path='/logs' component={Logs} />
          <Route path='/monitor' component={Monitor} />
          <Route path='/apis' component={Apis} />
        </div>
      </div>
    ) : (
      <Redirect to={{ pathname: '/sign-in' }} />
    ))
  )
}

const Auth = () => {
  const [state] = useContext(MainContext)

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

const AuthOrApp = props => {
  const [state] = useContext(MainContext)

  return (
    <Fragment>
      {state.isAuthenticated ? (
        <Route render={() => <App {...props} />} />
      ) : (
        <Redirect to={{ pathname: '/sign-in' }} />
      )}
    </Fragment>
  )
}

const RouteIndex = props => {
  return (
    <Switch>
      <Route path='/' exact render={() => <AuthOrApp {...props} />} />

      <Route path='/sign-in' render={() => <Auth {...props} />} />
      <Route path='/forgot-passwords' render={() => <Auth {...props} />} />

      <Route path='/users' render={() => <App {...props} />} />
      <Route path='/domains' render={() => <App {...props} />} />
      <Route path='/databases' render={() => <App {...props} />} />
      <Route path='/dns' render={() => <App {...props} />} />
      <Route path='/ssl' render={() => <App {...props} />} />
      <Route path='/cron' render={() => <App {...props} />} />
      <Route path='/logs' render={() => <App {...props} />} />
      <Route path='/monitor' render={() => <App {...props} />} />
      <Route path='/apis' render={() => <App {...props} />} />

      <Route render={() => <NotFound {...props} />} />
    </Switch>
  )
}

const Main = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <RouteIndex />
      </BrowserRouter>
    </MainProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
