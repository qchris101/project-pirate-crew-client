import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'

const SignUp = ({ msgAlert, setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [shouldNavigate, setShouldNavigate] = useState(false)

  const onSignUp = async (event) => {
    event.preventDefault()

    try {
      await signUp(email, password, passwordConfirmation)
      const res = await signIn(email, password)
      setUser(res.data.user)
      msgAlert({
        heading: 'Sign Up Success',
        message: signUpSuccess,
        variant: 'success'
      })
      setShouldNavigate(true)
    } catch (error) {
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      msgAlert({
        heading: 'Sign Up Failed with error: ' + error.message,
        message: signUpFailure,
        variant: 'danger'
      })
    }
  }

  if (shouldNavigate) {
    return <Navigate to='/' />
  }

  return (
    <div className='login'>
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <div className='loginLeft'>
            <h3 className='signUp-text'>Sign Up</h3>
            <Form className='loginBox' onSubmit={onSignUp}>
              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type='email'
                  name='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={event => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  name='password'
                  value={password}
                  type='password'
                  placeholder='Password'
                  onChange={event => setPassword(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='passwordConfirmation'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  required
                  name='passwordConfirmation'
                  value={passwordConfirmation}
                  type='password'
                  placeholder='Confirm Password'
                  onChange={event => setPasswordConfirmation(event.target.value)}
                />
              </Form.Group>
              <Button className='loginRegisterButton Bttn' variant='primary' type='submit'>Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
