import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './../css/style.scss'

const App = () => {
  return (
    <BrowserRouter>
      <div id='app'>
        <div id='menu'>
          menu2
        </div>

        <div id='main'>
          main
        </div>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
