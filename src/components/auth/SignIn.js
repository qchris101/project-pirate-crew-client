import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import { signInSuccess, signInFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import './Login.css'
import { ArrowReturnRight } from 'react-bootstrap-icons'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

handleChange = (event) =>
  this.setState({
    [event.target.name]: event.target.value
  })

onSignIn = (event) => {
  event.preventDefault()

  const { msgAlert, history, setUser } = this.props

  signIn(this.state)
    .then((res) => setUser(res.data.user))
    .then(() =>
      msgAlert({
        heading: 'Sign In Success',
        message: signInSuccess,
        variant: 'success'
      })
    )
    .then(() => history.push('/'))
    .catch((error) => {
      this.setState({ email: '', password: '' })
      msgAlert({
        heading: 'Sign In Failed with error: ' + error.message,
        message: signInFailure,
        variant: 'danger'
      })
    })
}

render () {
  const { email, password } = this.state

  return (
    <div className='login'>

      <div className='row mt-5'>
        <div className='col-md-6'>
          <div className='loginLeft'>
            <h3 className='loginLogo'>OurSpace</h3>
            <span className='loginDesc'>Connect with friends not around the world yet but soon!</span>
          </div>
        </div>
        <div className='col-md-6 mt-5'>
          <Form className='loginBox' onSubmit={this.onSignIn}>
            <h3>Sign In</h3>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className='loginInput'
                required
                type='email'
                name='email'
                value={email}
                placeholder='Enter email'
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className='loginRegisterButton Bttn  'variant='primary' type='submit'>Submit <ArrowReturnRight /></Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
}

export default withRouter(SignIn)
