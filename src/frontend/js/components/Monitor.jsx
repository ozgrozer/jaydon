import React, { useEffect } from 'react'

const Monitor = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/monitor'].title
  }, [])

  return (
    <div id='monitor'>
      <h1>Monitor</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam libero vitae sint unde? Accusantium labore necessitatibus laboriosam sunt molestiae magnam, nulla obcaecati in libero reprehenderit impedit corrupti numquam quidem voluptates.</p>
    </div>
  )
}

export default Monitor
