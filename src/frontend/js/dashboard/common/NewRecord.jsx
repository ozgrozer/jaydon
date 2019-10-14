import React, { useEffect } from 'react'

const NewRecord = props => {
  const { component } = props

  useEffect(() => {
    document.title = 'New - ' + window.defaults.routes[`/${component.pluralId}`].title
  }, [])

  return (
    <div id='newRecord'>
      <div className='header'>
        <h1>New {component.singularTitle}</h1>
      </div>
    </div>
  )
}

export default NewRecord
