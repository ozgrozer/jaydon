import React, { useEffect } from 'react'

const Cron = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/cron'].title
  }, [])

  return (
    <div id='cron'>
      <h1>Cron</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, aperiam dolorum! Iusto expedita ad maiores voluptatibus ipsum. Dignissimos repudiandae enim adipisci similique molestiae, explicabo, consectetur architecto facilis odio cumque quisquam?</p>
    </div>
  )
}

export default Cron
