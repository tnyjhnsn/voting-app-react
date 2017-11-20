import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createPoll } from '../../actions/polls'

import SavePollPage from './SavePollPage'

const CreatePollPageContainer = ({ auth, savePoll, polls }) => {
  if (polls.thanksPollCreated) {
    return (
      <Redirect to="/poll/create-success"/>
    )
  }
  return (
    <SavePollPage
      auth={auth}
      savePoll={savePoll}
    />
  )
}

const mapStateToProps = state => ({ auth: state.auth, polls: state.polls })

const mapDispatchToProps = dispatch => ({
  savePoll: pollData => dispatch(createPoll(pollData))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePollPageContainer)
