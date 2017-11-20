import React from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class ChangePasswordPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      password: '',
      passwordCheck: ''
    }
  }

  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value })
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      target.preventDefault()
      this.handleSubmit()
    }
  }

  handleSubmit() {
    this.props.sendPassword(this.state.password)
  }

  render() {
    const { isPasswordChanged, isLoggedIn } = this.props.auth
    if (isPasswordChanged && !isLoggedIn) {
      return (
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8" xl="5">
            <p>
              Your changes have been saved, and you can
              now <Link to="/account/login">log in</Link> with
              the new password.
            </p>
          </Col>
        </Row>
      )
    }
    if (isPasswordChanged && isLoggedIn) {
      return (
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8" xl="5">
            <p>
              Your new password has been saved.
            </p>
          </Col>
        </Row>
      )
    }
    return (
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8" xl="5">
          <p>
            Please enter and confirm a new password below to change the
            password associated with this email address.
          </p>
          <Form>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="password"
                type="password"
                value={this.state.password}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Confirm Password</Label>
              <Input
                id="passwordCheck"
                name="passwordCheck"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="password again"
                type="password"
                value={this.state.passwordCheck}
              />
            </FormGroup>
            <Button className="btn-sm" onClick={this.handleSubmit}>Change Password</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}
