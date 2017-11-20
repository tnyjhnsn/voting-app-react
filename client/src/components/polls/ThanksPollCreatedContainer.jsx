import React from 'react'
import { connect } from 'react-redux'
import { thanksPollCreated } from '../../actions/polls'
import Thanks from '../shared/Thanks'

class ThanksPollCreatedContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(thanksPollCreated(false))
  }

  render() {
    return (
      <Thanks
        message="Thank you. Your Poll has been created."
      />
    )
  }
}

export default connect()(ThanksPollCreatedContainer)
