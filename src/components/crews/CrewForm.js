import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { SendCheck } from 'react-bootstrap-icons'

const CrewForm = ({ handleSubmit, name, setName }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='name'>
      <Form.Label>Enter Crew Name</Form.Label>
      <Form.Control
        placeholder='Crew Name'
        name='name'
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </Form.Group>

    <Button className='mt-2 Bttn' variant='primary' type='submit'>Submit <SendCheck /></Button>
    <div className='mt-5 footer' >Time to find the One Piece</div>
  </Form>
)
export default CrewForm
