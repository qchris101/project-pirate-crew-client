import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import './Login.css'
import { ArrowReturnRight } from 'react-bootstrap-icons'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onSignUp = (event) => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then((res) => setUser(res.data.user))
      .then(() =>
        msgAlert({
          heading: 'Sign Up Success',
          message: signUpSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/'))
      .catch((error) => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

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

            <Form className='loginBox' onSubmit={this.onSignUp}>
              <h3>SignUp</h3>
              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
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
              <Form.Group controlId='passwordConfirmation'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  required
                  name='passwordConfirmation'
                  value={passwordConfirmation}
                  type='password'
                  placeholder='Confirm Password'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button className='loginRegisterButton Bttn' variant='primary' type='submit'>Submit <ArrowReturnRight /></Button>
            </Form>

          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(SignUp)
