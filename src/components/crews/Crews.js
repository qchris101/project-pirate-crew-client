import React, { useEffect, useState } from 'react'
import { indexCrew } from '../../api/crew'
import { Link, Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import './Crews.css'

// import { format } from 'timeago.js'
// import './Posts.css'
const Crews = ({ user, msgAlert, handleDeleteClick }) => {
  const [crews, setCrews] = useState([])

  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    const getCrews = async () => {
      try {
        const response = await indexCrew(user)
        setCrews(response.data.crew)
      } catch (error) {
        // Alert the user, that they failed to sign up
        msgAlert({
          heading: 'Crews cant be displayed: ' + error.message,
          message: 'Cant index Crews',
          // this will be red
          variant: 'danger'
        })
      }
    }
    getCrews()
  }, [])

  if (crews.length === 0) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
  const crewList = crews.map(crew => (
    <div className='crews' key={crews._id}>
      <Link to={`/crews/${crew.id}/edit`}>{crew.name}</Link>
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

export default Crews
