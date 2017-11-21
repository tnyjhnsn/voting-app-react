import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updatePoll } from '../../actions/polls'

import SavePollPage from './SavePollPage'

const EditPollPageContainer = ({ auth, polls, savePoll }) => {
  if (polls.thanksPollUpdated) {
    return (
      <Redirect to="/poll/update-success"/>
    )
  }
  const poll = polls.polls.filter(poll => {
    return poll._id === polls.selectedPollId
  })[0]
  return (
    <SavePollPage
      auth={auth}
      savePoll={savePoll}
      poll={poll}
    />
  )
}

const mapStateToProps = state => ({ auth: state.auth, polls: state.polls })

const mapDispatchToProps = dispatch => ({
  savePoll: pollData => dispatch(updatePoll(pollData))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPollPageContainer)
