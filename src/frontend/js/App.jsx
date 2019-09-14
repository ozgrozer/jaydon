import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'

import './../css/style.scss'

import Dashboard from './components/Dashboard'
import Users from './components/Users'
import Domains from './components/Domains'
import Databases from './components/Databases'
import Dns from './components/Dns'
import Ssl from './components/Ssl'
import Cron from './components/Cron'
import Logs from './components/Logs'
import Monitor from './components/Monitor'
import Apis from './components/Apis'

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
