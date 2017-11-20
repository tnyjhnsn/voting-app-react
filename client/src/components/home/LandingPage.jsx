import React from 'react'
import { Row, Col, Button, Card, CardBody, CardImg, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import pic from '../../images/VoteNow.jpg'

const LandingPage = ({ startProgress, stopProgress }) => {
  return (
    <Row className="justify-content-center">
      <Col xs="12" md="8">
        <div className="display-4">Pollster</div>
        <Card className="mb-2">
          <CardImg width="100%" src={pic} />
          <CardBody>
            <CardText>
              You are invited to vote on any of our polls. If you wish to create your own polls, please register an account using the top right menus. You can only edit or delete your own polls.
            </CardText>
          </CardBody>
        </Card>
        <Button className="btn-sm" tag={Link} to="/polls">Polls</Button>
        <div className="pull-right">
          <a href="https://github.com/tnyjhnsn/voting-app" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github fa-2x" aria-hidden="true" /></a></div>
      </Col>
    </Row>
  )
}

export default LandingPage
