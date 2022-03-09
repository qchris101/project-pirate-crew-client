import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { showCrew, updateCrew } from '../../api/crew'
import CrewForm from './CrewForm'

const CrewEdit = ({ user, msgAlert }) => {
  const [name, setName] = useState('')
  //   const [text, setText] = useState('')
  const [updated, setUpdated] = useState(false)
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
        const res = await showCrew(id, name, user)
        setName(res.data.crew.name)
        // setText(res.data.crew.text)
      } catch (error) {
        msgAlert({
          heading: 'Failed to load crew',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updateCrew(id, name, user)
      setUpdated(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to update crew',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (updated) {
    // Navigate to the 'show' page
    return <Navigate to={`/crews/${id}`} />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Edit Crew Name</h3>
        <CrewForm
          handleSubmit={handleSubmit}
          title={name}
          setTitle={setName}
        />
      </div>
    </div>
  )
}

export default CrewEdit
