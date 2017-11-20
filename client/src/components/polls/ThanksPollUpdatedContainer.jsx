import React from 'react'
import { connect } from 'react-redux'
import { thanksPollUpdated } from '../../actions/polls'
import Thanks from '../shared/Thanks'

class ThanksPollUpdatedContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(thanksPollUpdated(false))
  }

  render() {
    return (
      <Thanks
        message="Thank you. Your Poll has been updated."
      />
    )
  }
}

export default connect()(ThanksPollUpdatedContainer)
