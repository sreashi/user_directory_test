import React, { Component } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';

class Add extends Component {
  initialState = {
    form: {
        name: '',
        country: '',
        dob: '',
        email: '',
    },
  }

  state = this.initialState

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { name, country, dob, email } = this.state.form
    const { addRow } = this.props

    const newUser = {
      name,
      country,
      dob,
      email,
    }

    addRow(newUser)
    this.setState(this.initialState)
  }
  


  render() {
    const { name, country, dob, email } = this.state.form

    return (
      <Modal trigger={<Button content="Add New User" />} closeIcon>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="Name"
                name="name"
                value={name}
                onChange={this.handleChange}
                autoFocus={true}
              />
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
            <Button type="submit" content="Submit" disabled={!name } />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Add
