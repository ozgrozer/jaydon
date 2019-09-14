import React, { useEffect } from 'react'

const Logs = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/logs'].title
  }, [])

  return (
    <div id='logs'>
      <h1>Logs</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id suscipit omnis error officiis aliquam aut temporibus officia. Saepe quod odio aperiam, perferendis. Ipsam, error saepe, odit optio eos ullam consequatur.</p>
    </div>
  )
}

export default Logs
