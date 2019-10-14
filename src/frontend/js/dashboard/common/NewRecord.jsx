import React, { useEffect } from 'react'

const NewRecord = props => {
  const { component } = props

  useEffect(() => {
    document.title = 'New - ' + window.defaults.routes[`/${component.id}`].title
  }, [])

  return (
    <div id='newRecord'>
      NewRecord
    </div>
  )
}

export default NewRecord
