import React, { useEffect, useState } from 'react'
import { indexUsersCrew } from '../../api/crew'
import { Link, Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
// import { format } from 'timeago.js'
// import './Posts.css'
const UsersCreatedCrews = ({ user, msgAlert }) => {
  const [usersCrews, setUsersCrews] = useState([])

  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    const getAllCrews = async () => {
      try {
        const res = await indexUsersCrew(user)
        setUsersCrews(res.data.crews)
      } catch (error) {
        // Alert the user, that they failed to sign up
        msgAlert({
          heading: 'Crews Cant be displayed: ' + error.message,
          message: 'Cant index Crew',
          // this will be red
          variant: 'danger'
        })
      }
    }
    getAllCrews()
  }, [])

  if (!usersCrews.length) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
  const crewList = usersCrews.map(crew => (
    <div className='posts' key={crew._id}>
      <Link to={`/crews/${crew._id}`}>{crew.title}</Link>
    </div>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Crews</h3>
        <ul>{crewList}</ul>
      </div>
    </div>
  )
}

export default UsersCreatedCrews
