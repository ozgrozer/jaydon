import React, { useEffect } from 'react'

const Apis = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/apis'].title
  }, [])

  return (
    <div id='apis'>
      <h1>APIs</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ipsa eos eius porro cum eveniet consequuntur! Provident officia temporibus tempora deleniti repellendus molestias natus dolore, accusantium! Aliquid, excepturi delectus esse.</p>
    </div>
  )
}

export default Apis