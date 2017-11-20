import React from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class CredentialsPage extends React.Component {
  constructor(props) {
    super(props)
    this.compileFormData = this.compileFormData.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = key => event => {
    this.setState({ [key]: event.target.value })
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.compileFormData()
    }
  }

  compileFormData() {
    this.props.credentialsFunction(this.state)
  }

  renderForgotPasswordLink() {
    if (this.props.forgotPasswordLink) {
      return (
        <div>
          <br/><Link to="/account/reset-password">Forgot your password?</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8" xl="5">
          <Form>
            <FormGroup>
              <Label for="username">Email</Label>
              <Input
                id="username"
                name="username"
                onChange={this.handleInputChange('username')}
                onKeyPress={this.handleKeyPress}
                placeholder="noreply@pollster.io"
                type="email"
                value={this.state.username}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                onChange={this.handleInputChange('password')}
                onKeyPress={this.handleKeyPress}
                placeholder="password"
                type="password"
                value={this.state.password}
              />
            </FormGroup>
            <Button className="btn-sm" onClick={this.compileFormData}>{this.props.buttonLabel}</Button>
            {this.renderForgotPasswordLink()}
          </Form>
        </Col>
      </Row>
    )
  }
}
