import React from 'react'
import { connect } from 'react-redux'
import { registrationSuccessViewed } from '../../actions/auth'

import RegisterSuccessPage from './RegisterSuccessPage'

class RegisterSuccessPageContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(registrationSuccessViewed())
  }

  render() {
    return <RegisterSuccessPage />
  }
}

export default connect()(RegisterSuccessPageContainer)
