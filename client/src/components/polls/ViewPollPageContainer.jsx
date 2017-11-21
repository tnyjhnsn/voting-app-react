import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { incrementVote } from '../../actions/polls'
import ViewPollPage from './ViewPollPage'
import PollChart from './Chart'

// TODO should be a SFC
class ViewPollPageContainer extends React.Component {
  render() {
    if (this.props.polls.thanksVote) {
      return <Redirect to="/poll/vote-success"/>
    }
    const poll = this.props.polls.polls.filter(poll => {
      return poll._id === this.props.polls.selectedPollId
    })[0]
    return (
      <div>
        <ViewPollPage
          auth={this.props.auth}
          incrementVote={this.props.incrementVote}
          poll={poll}
        />
        <PollChart poll={poll} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  polls: state.polls
})

const mapDispatchToProps = dispatch => ({
  incrementVote: id => dispatch(incrementVote(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPollPageContainer)
