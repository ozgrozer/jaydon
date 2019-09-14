import React from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

const App = () => {
  return (
    <div id='app'>
      <div id='menu'>
        menu
      </div>

      <div id='main'>
        main
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
