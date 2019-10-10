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
        <div className='form-group'>
          <Input
            type='text'
            name='username'
            placeholder='Username'
            validations={validations.username}
            className='form-control form-control-lg'
          />
        </div>

        <div className='form-group'>
          <Input
            type='password'
            name='password'
            placeholder='Password'
            validations={validations.password}
            className='form-control form-control-lg'
          />
        </div>

        <div className='form-group'>
          <div className='custom-control custom-checkbox'>
            <Input
              type='checkbox'
              id='rememberMe'
              className='custom-control-input'
            />
            <label
              className='custom-control-label'
              for='rememberMe'
            >
              Remember Me
            </label>
          </div>
        </div>

        <button className='btn btn-primary btn-lg btn-block'>
          Submit
        </button>
      </Form>
    </div>
  )
}

export default SignIn
