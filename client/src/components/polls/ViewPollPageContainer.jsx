import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { incrementVote, viewPoll } from '../../actions/polls'
import ViewPollPage from './ViewPollPage'
import PollChart from './Chart'

class ViewPollPageContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.viewPoll(false)
  }

  render() {
    if (this.props.polls.thanksVote) {
      return <Redirect to="/poll/vote-success"/>
    }
    return (
      <div>
        <ViewPollPage
          auth={this.props.auth}
          incrementVote={this.props.incrementVote}
          poll={this.props.polls.poll}
        />
        <PollChart poll={this.props.polls.poll} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  polls: state.polls
})

const mapDispatchToProps = dispatch => ({
  incrementVote: id => dispatch(incrementVote(id)),
  viewPoll: bool => dispatch(viewPoll(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPollPageContainer)
