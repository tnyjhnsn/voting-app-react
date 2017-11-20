import React from 'react'
import { connect } from 'react-redux'
import { thanksVote } from '../../actions/polls'
import Thanks from '../shared/Thanks'

class ThanksVoteContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(thanksVote(false))
  }

  render() {
    return (
      <Thanks
        message="Thank you. Your vote has been counted."
      />
    )
  }
}

export default connect()(ThanksVoteContainer)
