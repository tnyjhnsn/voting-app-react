import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAllPolls, getMyPolls, getPoll, deletePoll } from '../../actions/polls'

import ListPollsPage from './ListPollsPage'

class ListPollsPageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.createPoll = this.createPoll.bind(this)
    this.state = {
      createPoll: false
    }
  }
  componentWillMount() {
    if (this.props.polls.viewingMyPolls) {
      return this.props.getMyPolls(this.props.auth.id)
    }
    this.props.getAllPolls()
  }

  createPoll() {
    this.setState({
      createPoll: true
    })
  }

  render() {
    const { polls, getAllPolls, getMyPolls, getPoll, deletePoll, auth } = this.props
    if (polls.viewPoll) {
      return (<Redirect to="/poll/view" />)
    }
    if (this.state.createPoll) {
      return (<Redirect to="/poll/create" />)
    }
    return (
      <ListPollsPage
        auth={auth}
        createPoll={this.createPoll}
        deletePoll={deletePoll}
        getAllPolls={getAllPolls}
        getMyPolls={getMyPolls}
        getPoll={getPoll}
        polls={polls.polls}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  polls: state.polls
})

const mapDispatchToProps = dispatch => ({
  getAllPolls: () => dispatch(getAllPolls()),
  getMyPolls: id => dispatch(getMyPolls(id)),
  getPoll: id => dispatch(getPoll(id)),
  deletePoll: id => dispatch(deletePoll(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListPollsPageContainer)

