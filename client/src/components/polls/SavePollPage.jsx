import React from 'react'
import { Row, Col, Alert, Button, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class SavePollPage extends React.Component {
  constructor(props) {
    super(props)

    this.savePoll = this.savePoll.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.listAnswers = this.listAnswers.bind(this)
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this)
    this.handleAddAnswer = this.handleAddAnswer.bind(this)
    this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.validateForm = this.validateForm.bind(this)

    this.state = {
      invalidForm: false,
      poll: {
        owner: this.props.auth.id,
        question: '',
        answers: [
          { answer: '', votes: 0 },
          { answer: '', votes: 0 }
        ]
      }
    }
  }

  componentWillMount() {
    this.setState({ poll: this.props.poll || this.state.poll })
  }

  handleQuestionChange(e) {
    this.setState({
      poll: { ...this.state.poll, question: e.target.value }
    })
  }

  listAnswers = answers => answers.map((answer, index) =>
    (
      <InputGroup className="mb-1" key={index}>
        <Input
          id={`answer${index}`}
          name={`answer${index}`}
          onChange={this.handleChangeAnswer(index)}
          onKeyPress={this.handleKeyPress}
          placeholder={`Answer ${index + 1}`}
          type="textarea"
          value={answer.answer}
        />
        {this.state.poll.answers.length >= 3 &&
          <InputGroupAddon>
            <span onClick={this.handleRemoveAnswer(index)}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </span>
          </InputGroupAddon>
        }
      </InputGroup>
    )
  )

  handleChangeAnswer = index => event => {
    const newAnswers = this.state.poll.answers.map((answer, i) => {
      if (index !== i) return answer
      return { ...answer, answer: event.target.value }
    })
    this.setState({
      poll: { ...this.state.poll, answers: newAnswers }
    })
  }

  handleAddAnswer = () => {
    const { poll } = this.state
    this.setState({
      exceededMinMax: false,
      poll: {
        ...poll,
        answers: poll.answers.concat([{ answer: '', votes: 0 }]) }
    })
  }

  handleRemoveAnswer = index => () => {
    const { poll } = this.state
    this.setState({
      exceededMinMax: false,
      poll: {
        ...poll,
        answers: poll.answers.filter((answer, i) => index !== i)
      }
    })
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.compileFormData()
    }
  }

  savePoll() {
    if (!this.validateForm(this.state.poll)) {
      return this.setState({ invalidForm: true })
    }
    this.props.savePoll(this.state.poll)
  }

  validateForm(poll) {
    if (poll.question.trim() === '') {
      return false
    }
    return poll.answers.every(answer => answer.answer !== '')
  }

  onDismiss() {
    this.setState({
      invalidForm: false
    })
  }

  render() {
    const { poll } = this.state
    return (
      <Row className="justify-content-center">
        <Col xs="12" sm="10" md="8" xl="5">
          <Alert color="danger" isOpen={this.state.invalidForm} toggle={this.onDismiss}>
            Invalid Form. Question and answers should not be empty.
          </Alert>
          <Form>
            <FormGroup>
              <h5>Question</h5>
              <Input
                id="question"
                name="question"
                onChange={this.handleQuestionChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Question"
                type="textarea"
                value={poll.question}
              />
            </FormGroup>
            <FormGroup>
              <h5>Answers</h5>
              {this.listAnswers(poll.answers)}
            </FormGroup>
            <Button className="btn-sm" disabled={poll.answers.length === 5}
              onClick={this.handleAddAnswer}>Add</Button>
            <Button className="btn-sm pull-right ml-1" onClick={this.savePoll}>Save</Button>
            <Button className="btn-sm pull-right" tag={Link} to="/polls">Cancel</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}
