import React from 'react'
import { Route } from 'react-router-dom'

import ListRecords from '~/src/frontend/js/dashboard/common/ListRecords'
import EditAndNewRecord from '~/src/frontend/js/dashboard/common/EditAndNewRecord'

const Page = props => {
  const { component } = props
  const componentLink = component.link

  return (
    <div id='page'>
      <Route
        exact
        path={`/${componentLink}/:recordId`}
        component={_props => (
          <EditAndNewRecord
            {..._props}
            component={component}
          />
        )}
      />
      <Route
        exact
        path={`/${componentLink}`}
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
