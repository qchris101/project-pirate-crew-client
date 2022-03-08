import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { SendCheck } from 'react-bootstrap-icons'

const CrewForm = ({ handleSubmit, name, setName }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='name'>
      <Form.Label>Name</Form.Label>
      <Form.Control
        placeholder='Crew Name'
        name='name'
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </Form.Group>

    {/* <Form.Group controlId='text'>
      <Form.Label>Post</Form.Label>
      <Form.Control
        placeholder='Whats on your mind?'
        name='text'
        value={text}
        onChange={event => setText(event.target.value)}
      />
    </Form.Group> */}

    {/* <Form.Group controlId='feelings'>
      <Form.Label>Feelings Scale 1-5</Form.Label>
      <Form.Control
        placeholder='feelings 1-5'
        name='feelings'
        value={feelings}
        onChange={event => setFeelings(event.target.value)}
      />
    </Form.Group> */}
    <Button className='mt-2 Bttn' variant='primary' type='submit'>Submit <SendCheck /></Button>
    <div className='mt-5 footer' >Tell the world you onion</div>
  </Form>
)
export default CrewForm
