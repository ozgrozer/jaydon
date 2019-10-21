import React, { useEffect } from 'react'
import { store } from 'react-notifications-component'

const notification = props => {
  const { title, message, type } = props

  store.addNotification({
    title,
    message,
    type,
    width: 200,
    container: 'bottom-left',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000,
      pauseOnHover: true
    }
  })
}

const Dashboard = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/'].title

    notification({
      type: 'success',
      message: 'Successfully created'
    })
  }, [])

  return (
    <div id='dashboard'>
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

export default Dashboard
