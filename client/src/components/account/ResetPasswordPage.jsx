import React from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

export default class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props)

    this.clearPasswordReset = this.clearPasswordReset.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      username: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPasswordReset) {
      this.setState({ username: '' })
    }
  }

  clearPasswordReset(e) {
    e.preventDefault()
    this.props.passwordResetClear()
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    this.props.createHash(this.state.username)
  }

  render() {
    if (this.props.isPasswordReset) {
      return (
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8" xl="5">
            <p>
              An email has been sent to the address you provided containing a link to reset
              your password. Please click that link to proceed with setting a new password.
            </p>
            <p>
              <a href="/account/reset-password" onClick={this.clearPasswordReset}>Re-send Email</a>
            </p>
          </Col>
        </Row>
      )
    }
    return (
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8" xl="5">
          <p>
            If you&lsquo;d like to reset your password, please enter your email here
            and a link to do so will be sent to the address you enter.
          </p>
          <Form>
            <FormGroup>
              <Label for="username">Email</Label>
              <Input
                id="username"
                name="username"
                onChange={this.handleUsernameChange}
                onKeyPress={this.handleKeyPress}
                placeholder="noreply@pollster.io"
                type="email"
                value={this.state.username}
              />
            </FormGroup>
            <Button className="btn-sm" onClick={this.handleSubmit}>Reset Password</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}
