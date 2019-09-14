import React, { useEffect } from 'react'

const Ssl = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/ssl'].title
  }, [])

  return (
    <div id='ssl'>
      <h1>SSL</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus et, suscipit laboriosam distinctio quam a debitis tempora consectetur rerum, beatae similique, voluptate perspiciatis molestiae amet impedit excepturi neque animi nesciunt.</p>
    </div>
  )
}

export default Ssl
