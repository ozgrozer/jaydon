import React, { useEffect } from 'react'

const Domains = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/domains'].title
  }, [])

  return (
    <div id='domains'>
      <h1>Domains</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ex possimus, alias ea earum similique neque ducimus consequuntur modi consequatur non, consectetur repellendus nemo. At cupiditate amet, corporis voluptatibus harum.</p>
    </div>
  )
}

export default Domains
