import React from 'react'
import { Alert, Row, Col } from 'reactstrap'

export const ErrorBox = ({ clearError, error: { error, isError } }) => {
  return (
    <Row className="justify-content-center">
      <Col xs="12" sm="10" md="8" xl="5">
        <Alert color="danger" isOpen={isError} toggle={clearError}>
          {error && error.message ? error.message : 'An undefined error occurred'}
        </Alert>
      </Col>
    </Row>
  )
}

export default ErrorBox
