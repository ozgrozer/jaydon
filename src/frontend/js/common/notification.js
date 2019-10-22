import { store } from 'react-notifications-component'

const notification = props => {
  const { title, message, type } = props

  store.addNotification({
    title,
    message,
    type,
    width: 250,
    container: 'bottom-left',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000,
      pauseOnHover: true
    }
  })
}

export default notification
