import React, { useEffect } from 'react'

const RecordDetails = props => {
  const { component } = props

  useEffect(() => {
    document.title = 'Details - ' + window.defaults.routes[`/${component.id}`].title
  }, [])

  return (
    <div id='recordDetails'>
      RecordDetails
    </div>
  )
}

export default RecordDetails
