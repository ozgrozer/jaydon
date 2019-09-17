import React, { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/'].title
  }, [])

  return (
    <div id='dashboard'>
      <div className='header'>
        <h1>Dashboard</h1>
      </div>

      <div className='content'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quis, delectus eos ea magnam alias non officiis mollitia cum quisquam harum inventore, quo explicabo cupiditate reiciendis rem minus qui aperiam?
      </div>
    </div>
  )
}

export default Dashboard
