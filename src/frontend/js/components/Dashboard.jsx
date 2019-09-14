import React, { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/'].title
  }, [])

  return (
    <div id='dashboard'>
      <h1>Dashboard</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quis, delectus eos ea magnam alias non officiis mollitia cum quisquam harum inventore, quo explicabo cupiditate reiciendis rem minus qui aperiam?</p>
    </div>
  )
}

export default Dashboard
