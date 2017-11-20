import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Row, Col } from 'reactstrap'

const Thanks = props => {
  return (
    <Row className="justify-content-center">
      <Col xs="12" sm="10" md="8" xl="5">
        <Alert color="success">
          {props.message}
        </Alert>
        <Button className="btn-sm" tag={Link} to="/polls">Polls</Button>
      </Col>
    </Row>
  )
}

export default Thanks
