import React, { Component } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';

class Edit extends Component {
  initialState = {
    form: {
        name: '',
        country: '',
        dob: '',
        email: '',
     },
  }

  state = this.initialState

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      const user = this.props.getUserById(this.props.id)

      this.setState({
        form: {
          name: user.name,
          country: user.country,
          dob: user.dob,
          email: user.email,
        },
      })
    }
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { name, country,dob,email } = this.state.form
    const { updateRow } = this.props

    const updatedUser = {
      name,
      country,
      dob,
      email,
    }

    updateRow(this.props.id, updatedUser)
    this.props.onClose()
  }

  render() {
    const { name, country,dob,email} = this.state.form
    const { isOpen, onClose } = this.props

    return (
      <Modal open={isOpen} onClose={onClose} closeIcon>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input label="Name" name="name" value={name} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Country"
                name="country"
                value={country}
                onChange={this.handleChange}
              />
            </Form.Field>
  
            <Form.Field>
              <Form.Input
                label="Date of birth"
                name="dob"
                value={dob}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" content="Submit" />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Edit
