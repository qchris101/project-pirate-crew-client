import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { createCrew } from '../../api/crew'
import CrewForm from './CrewForm'

const CrewCreate = ({ user, msgAlert }) => {
  const [name, setName] = useState('')
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createCrew(name, user)
      setCreatedId(res.data.crew.id)
      msgAlert({
        heading: 'Crew Created',
        message: `Created ${name} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create Crew',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // if user is null, redirect to home page
  if (!user) {
    return <Navigate to='/' />
  } else if (createdId) {
    // if crew has been created,Navigate to the 'show' page
    return <Navigate to={`/crews/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-md-3 mx-auto mt-5'>
        <h3>Create Crew</h3>
        <CrewForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
        />
      </div>

    </div>
  )
}

export default CrewCreate
