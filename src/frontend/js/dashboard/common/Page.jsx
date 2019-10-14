import React from 'react'
import { Route } from 'react-router-dom'

import ListRecords from './ListRecords'
import EditAndNewRecord from './EditAndNewRecord'

const Page = props => {
  return (
    <div id='page'>
      <Route
        exact
        path='/domains/:recordId'
        component={_props => (
          <EditAndNewRecord
            {..._props}
            component={props.component}
          />
        )}
      />
      <Route
        exact
        path='/domains'
        component={_props => (
          <ListRecords
            {..._props}
            component={props.component}
          />
        )}
      />
    </div>
  )
}

export default Page
