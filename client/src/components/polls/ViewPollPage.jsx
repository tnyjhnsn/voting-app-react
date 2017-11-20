import React from 'react'
import { Alert, Row, Col, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class ViewPollPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectVote = this.handleSelectVote.bind(this)
    this.incrementVote = this.incrementVote.bind(this)
    this.showTick = this.showTick.bind(this)
    this.listAnswers = this.listAnswers.bind(this)
    this.state = {
      selectedAnswer: ''
    }
  }

  handleSelectVote = id => () => {
    this.setState({ selectedAnswer: id })
  }

  incrementVote() {
    this.props.incrementVote(this.state.selectedAnswer)
  }

  showTick(id) {
    return this.state.selectedAnswer === id
  }

  listAnswers(answers) {
    const style = { cursor: 'pointer' }
    return answers.map((answer, i) =>
      (
        <ListGroupItem key={i} style={style} onClick={this.handleSelectVote(answer._id)}>
          { answer.votes > 0 && <span className="float-left mr-3">
            <i className="fa fa-circle" style={this.getColor(i)} /></span>
          }
          <ListGroupItemHeading className="mb-0">{answer.answer}</ListGroupItemHeading>
          <ListGroupItemText className="mb-0">
            <span className="small text-muted">Votes: {answer.votes}
              {this.showTick(answer._id) &&
                <i className="fa fa-check fa-2x pull-right text-success" />}
            </span>
          </ListGroupItemText>
        </ListGroupItem>
      )
    )
  }

  getColor(i) {
    const colors = ['#6740b4', '#2c98f0', '#f05830', '#febf2e', '#50ad55']
    return { color: colors[i] }
  }

  render() {
    const showEdit = this.props.auth.id === this.props.poll.owner
    return (
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8" xl="5">
          <Alert color="info">
            <h4>{this.props.poll.question}</h4>
          </Alert>
          <ListGroup className="mb-2">
            {this.listAnswers(this.props.poll.answers)}
          </ListGroup>
          {showEdit && <Button className="btn-sm" tag={Link} to="/poll/edit">Edit</Button>}
          <Button className="btn-sm pull-right"
            disabled={!this.state.selectedAnswer} onClick={this.incrementVote}>Cast Vote</Button>
          <Button className="btn-sm pull-right mr-1" tag={Link} to="/polls">Cancel</Button>
        </Col>
      </Row>
    )
  }
}

