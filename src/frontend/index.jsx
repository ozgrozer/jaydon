import React, { Fragment} from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

const App = () => {
  return (
    <Fragment>
      <div id='menu'>
        menu
      </div>

      <div id='main'>
        main
      </div>
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
