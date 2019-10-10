import React, { useEffect, useContext } from 'react'
import { Form, Input } from 'rfv'

import { MainContext } from './../context/MainContext'

const validations = {
  username: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a username'
    }
  ],
  password: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a password'
    }
  ]
}

const SignIn = () => {
  const { setState } = useContext(MainContext)

  useEffect(() => {
    document.title = window.defaults.routes['/sign-in'].title
  }, [])

  const postSubmit = (res) => {
    if (res.data.success) {
      setState({
        isAuthenticated: true
      })
    } else if (res.data.error) {
      console.log(res.data.error)
    }
  }

  return (
    <div id='signIn'>
      <Form
        postSubmit={postSubmit}
        postOptions={{ method: 'post', url: '/sign-in' }}
      >
        <div>
          <Input
            type='text'
            name='username'
            placeholder='Username'
            validations={validations.username}
          />
        </div>

        <div>
          <Input
            type='password'
            name='password'
            placeholder='Password'
            validations={validations.password}
          />
        </div>

        <div>
          <button>Submit</button>
        </div>
      </Form>
    </div>
  )
}

export default SignIn
