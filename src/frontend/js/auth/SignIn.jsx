import React, { useEffect, useContext } from 'react'
import { Form, Input } from 'rfv'

import { MainContext } from '~/src/frontend/js/context/MainContext'
import validations from '~/src/common/validations'

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
            validations={validations.signIn.username}
            className='form-control form-control-lg'
          />
        </div>

        <div className='form-group'>
          <Input
            type='password'
            name='password'
            placeholder='Password'
            validations={validations.signIn.password}
            className='form-control form-control-lg'
          />
        </div>

        <div className='form-group'>
          <div className='custom-control custom-checkbox'>
            <Input
              type='checkbox'
              id='rememberMe'
              name='rememberMe'
              className='custom-control-input'
            />
            <label
              htmlFor='rememberMe'
              className='custom-control-label'
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
