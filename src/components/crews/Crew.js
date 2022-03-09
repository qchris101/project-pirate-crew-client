import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'
import { deleteCrew, showCrew } from '../../api/crew'
// import { format } from 'timeago.js'
// import './Post.css'
import { SendCheck, TrashFill } from 'react-bootstrap-icons'

const Crew = ({ user, msgAlert }) => {
  const [crew, setCrew] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

  // if user is null, redirect to home page
  // Note: Must check before useEffect, since it needs user
  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    // When using async & await in a `useEffect` function
    // We have to wrap our `async` code in a function:
    // https://stackoverflow.com/a/53572588
    const fetchData = async () => {
      try {
        const res = await showCrew(id, user)
        setCrew(res.data.crew)
        console.log(user)
      } catch (error) {
        msgAlert({
          heading: 'Crew failed to load this is coming from (Crew.js Error)',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleDeleteClick = async () => {
    try {
      await deleteCrew(id, user)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete Crew',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (!crew) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/crews' />
  } else {
    // We have a post, display it!
    return (
      <div className='post'>
        <div className='PostWrapper'>
          <h3>{crew.name}</h3>
          {/* <span className='postDate'>{format(crew.createdAt)}</span>
          </h3> */}
          <Link to={`/crews/${id}/edit`}>
            <Button className='Bttn' variant='primary' type='submit'>Update Crew <SendCheck /></Button>
          </Link>
          <Button className='Bttn' variant='danger' onClick={handleDeleteClick}>Delete Crew <TrashFill /></Button>
        </div>
      </div>
    )
  }
}

export default Crew
