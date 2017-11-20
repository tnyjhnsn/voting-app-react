import React from 'react'
import { Row, Col } from 'reactstrap'

const RegisterSuccessPage = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="12" sm="10" md="8" xl="5">
        <p>Registration successful. You are now logged in.</p>
        <p>Thanks for signing up!</p>
      </Col>
    </Row>
  )
}

export default RegisterSuccessPage
