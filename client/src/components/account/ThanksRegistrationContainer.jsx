import React from 'react'
import { connect } from 'react-redux'
import { thanksRegistration } from '../../actions/auth'
import Thanks from '../shared/Thanks'

class ThanksRegistrationContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(thanksRegistration(false))
  }

  render() {
    return (
      <Thanks
        message="Registration successful. You are now logged in."
      />
    )
  }
}

export default connect()(ThanksRegistrationContainer)
