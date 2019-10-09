import React, { useEffect, useContext } from 'react'
import { Form, Input } from 'rfv'

import { MainContext } from './../context/MainContext'

const validations = {
  email: [
    {
      rule: 'isEmail',
      invalidFeedback: 'Please provide a valid email'
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
    setState({
      isAuthenticated: true
    })
  }

  return (
    <div id='signIn'>
      <Form
        postSubmit={postSubmit}
        postOptions={{ method: 'post', url: '/sign-in' }}
      >
        <div>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            validations={validations.email}
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
