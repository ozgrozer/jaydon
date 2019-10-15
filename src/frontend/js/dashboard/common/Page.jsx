import React from 'react'
import { Route } from 'react-router-dom'

import ListRecords from './ListRecords'
import EditAndNewRecord from './EditAndNewRecord'

const Page = props => {
  const { component } = props

  return (
    <div id='page'>
      <Route
        exact
        path={`/${component.id}/:recordId`}
        component={_props => (
          <EditAndNewRecord
            {..._props}
            component={component}
          />
        )}
      />
      <Route
        exact
        path={`/${component.id}`}
        component={_props => (
          <ListRecords
            {..._props}
            component={component}
          />
        )}
      />
    </div>
  )
}

export default Page
