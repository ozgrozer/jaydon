import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

const App = () => {
  return (
    <div>
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
