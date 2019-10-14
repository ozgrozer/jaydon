import React from 'react'
import { Route } from 'react-router-dom'

import ListRecords from './ListRecords'
import NewRecord from './NewRecord'
import RecordDetails from './RecordDetails'

const RecordDetailsOrNewRecord = props => {
  const recordId = props.match.params.recordId
  if (recordId === 'new') {
    return <NewRecord {...props} />
  } else {
    return <RecordDetails {...props} />
  }
}

const Page = props => {
  return (
    <div id='page'>
      <Route
        exact
        path='/domains/:recordId'
        component={_props => (
          <RecordDetailsOrNewRecord
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
