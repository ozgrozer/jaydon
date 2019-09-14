import React, { useEffect } from 'react'

const ForgotPassword = () => {
  useEffect(() => {
    document.title = window.defaults.routes['/forgot-password'].title
  }, [])

  return (
    <div id='forgotPassword'>
      forgot password
    </div>
  )
}

export default ForgotPassword
