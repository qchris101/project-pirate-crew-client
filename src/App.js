import React, { Component, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

import Home from './components/crews/Home'
// import Posts from './components/posts/Posts'
// import PostEdit from './components/posts/PostEdit'
// import Post from './components/posts/Post'
import CrewCreate from './components/crews/CrewCreate'
import Crew from './components/crews/Crew'
import Crews from './components/crews/Crews'
import UsersCreatedCrews from './components/crews/UsersCreatedCrews'
import CrewEdit from './components/crews/CreateEdit'
// import OneUsersAllPosts from './components/posts/OneUsersAllPosts'
// import './app.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <div className='a'>
          <Header user={user} />
          {msgAlerts.map((msgAlert) => (
            <AutoDismissAlert
              key={msgAlert.id}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
              id={msgAlert.id}
              deleteAlert={this.deleteAlert}
            />
          ))}

          <main className='container'>
            <Routes>
              <Route
                path='/sign-up'
                element={<SignUp msgAlert={this.msgAlert} setUser={this.setUser} /> }
              />
              <Route
                path='/sign-in'
                element={<SignIn msgAlert={this.msgAlert} setUser={this.setUser} /> }
              />
              <Route
                path='/sign-out'
                element={<SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} /> }
              />
              <Route
                path='/change-password'
                element={<ChangePassword msgAlert={this.msgAlert} user={user} /> }
              />

              <Route
                path='/'
                element={<Home msgAlert={this.msgAlert} user={user} /> }
              />
              <Route
                path='/crews/create'
                element={<CrewCreate msgAlert={this.msgAlert} user={user} /> }
              />
              <Route
                path='/crews/:id'
                element={<Crew msgAlert={this.msgAlert} user={user} /> }
              />
              <Route
                path='/crews'
                element={<Crews msgAlert={this.msgAlert} user={user} /> }
              />
              <Route
                path='/crews/owner'
                element={<UsersCreatedCrews msgAlert={this.msgAlert} user={user} /> }
              />
              <Route
                path='/crews/:id/edit'
                element={<CrewEdit msgAlert={this.msgAlert} user={user} /> }
              />
            </Routes>
          </main>
        </div>
      </Fragment>

    )
  }
}

export default App
