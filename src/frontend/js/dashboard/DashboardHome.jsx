import React, { useEffect } from 'react'

const DashboardHome = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/'].title
  }, [])

  return (
    <div id='dashboardHome'>
      <div className='header'>
        <h1>Dashboard</h1>
      </div>

      <div className='content'>
        <div className='box1'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quis, delectus eos ea magnam alias non officiis mollitia cum quisquam harum inventore, quo explicabo cupiditate reiciendis rem minus qui aperiam?
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
