import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPolls, listMyPolls, viewPoll, deletePoll } from '../../actions/polls'

import ListPollsPage from './ListPollsPage'

class ListPollsPageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.getPollsList = this.getPollsList.bind(this)
    this.createPoll = this.createPoll.bind(this)
    this.viewPoll = this.viewPoll.bind(this)
    this.state = {
      createPoll: false,
      viewPoll: false
    }
  }

  componentWillMount() {
    this.props.getPolls()
  }

  getPollsList() {
    if (this.props.polls.listMyPolls) {
      return this.props.polls.polls.filter(poll => poll.owner === this.props.auth.id)
    }
    return this.props.polls.polls
  }

  createPoll() {
    this.setState({
      createPoll: true
    })
  }

  viewPoll(pollId) {
    this.setState({
      viewPoll: true
    })
    this.props.viewPoll(pollId)
  }

  render() {
    const { getPolls, listMyPolls, deletePoll, auth } = this.props
    if (this.state.viewPoll) {
      return (<Redirect to="/poll/view" />)
    }
    if (this.state.createPoll) {
      return (<Redirect to="/poll/create" />)
    }
    return (
      <ListPollsPage
        auth={auth}
        createPoll={this.createPoll}
        viewPoll={this.viewPoll}
        deletePoll={deletePoll}
        getPolls={getPolls}
        listMyPolls={listMyPolls}
        polls={this.getPollsList()}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  polls: state.polls
})

const mapDispatchToProps = dispatch => ({
  getPolls: () => dispatch(getPolls()),
  listMyPolls: bool => dispatch(listMyPolls(bool)),
  viewPoll: id => dispatch(viewPoll(id)),
  deletePoll: id => dispatch(deletePoll(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListPollsPageContainer)

