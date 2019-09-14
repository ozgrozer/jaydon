import React, { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/not-found'].title
  }, [])

  return (
    <div id='notFound'>
      not found
    </div>
  )
}

export default NotFound
