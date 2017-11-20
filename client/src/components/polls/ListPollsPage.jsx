import React from 'react'
import { Alert, Button, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

export default class ListPollsPage extends React.Component {
  constructor(props) {
    super(props)
    this.getAllPolls = this.getAllPolls.bind(this)
    this.getMyPolls = this.getMyPolls.bind(this)
    this.createPoll = this.createPoll.bind(this)
    this.getPoll = this.getPoll.bind(this)
    this.deletePoll = this.deletePoll.bind(this)
    this.showDelete = this.showDelete.bind(this)
  }

  getAllPolls() {
    this.props.getAllPolls()
  }

  getMyPolls() {
    this.props.getMyPolls(this.props.auth.id)
  }

  createPoll() {
    this.props.createPoll()
  }

  getPoll = id => () => {
    this.props.getPoll(id)
  }

  deletePoll = pollId => (e) => {
    e.stopPropagation()
    this.props.deletePoll(pollId)
  }

  showDelete(id) {
    return this.props.auth.id === id
  }

  listPolls(polls) {
    const style = { cursor: 'pointer' }
    return polls.map((poll, i) =>
      (
        <ListGroupItem key={i} style={style} onClick={this.getPoll(poll._id)}>
          <ListGroupItemHeading className="mb-0">{poll.question}</ListGroupItemHeading>
          <ListGroupItemText className="mb-0">
            <span className="small text-muted">Votes: {poll.totalVotes}
              {this.showDelete(poll.owner) &&
                <i className="fa fa-trash-o fa-2x pull-right" onClick={this.deletePoll(poll._id)}/>}
            </span>
          </ListGroupItemText>
        </ListGroupItem>
      )
    )
  }

  getNavButtons() {
    return (
      <div>
        <Button className="btn-sm pull-right ml-1"
          onClick={this.getAllPolls}>All Polls</Button>
        <Button className="btn-sm pull-right"
          onClick={this.getMyPolls}>My Polls</Button>
        <Button className="btn-sm"
          onClick={this.createPoll}>New</Button>
      </div>
    )
  }

  render() {
    const displayHeading = this.props.polls.length
    return (
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8" xl="5">
          {this.props.auth.isLoggedIn && this.getNavButtons()}
          <Alert color="info" className="mt-3">
            <h4>{displayHeading ?
              'What do you think about these topics?' :
              'There are no polls to display.'}</h4>
          </Alert>
          <ListGroup>
            {this.listPolls(this.props.polls)}
          </ListGroup>
        </Col>
      </Row>
    )
  }
}
