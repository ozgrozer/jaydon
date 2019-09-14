import React, { useEffect } from 'react'

const Databases = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/databases'].title
  }, [])

  return (
    <div id='databases'>
      <h1>Databases</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore optio suscipit, blanditiis quia, accusantium nisi sed dolorum quibusdam quisquam rerum assumenda laboriosam omnis, quod modi deleniti, ipsam minus dignissimos odio!</p>
    </div>
  )
}

export default Databases
