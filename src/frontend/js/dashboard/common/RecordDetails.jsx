import React, { useEffect } from 'react'

const RecordDetails = props => {
  const { component } = props

  useEffect(() => {
    document.title = 'Details - ' + window.defaults.routes[`/${component.pluralId}`].title
  }, [])

  return (
    <div id='recordDetails'>
      <div className='header'>
        <h1>Edit {component.singularTitle}</h1>
      </div>
    </div>
  )
}

export default RecordDetails
