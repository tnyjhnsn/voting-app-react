import React from 'react'
import { connect } from 'react-redux'
import { passwordSaveClear, savePassword } from '../../actions/auth'

import ChangePasswordPage from './ChangePasswordPage'

class ChangePasswordPageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.sendPassword = this.sendPassword.bind(this)
  }

  componentWillUnmount() {
    this.props.dispatch(passwordSaveClear())
  }

  sendPassword(password) {
    const data = {
      hash: this.props.match.params.hash,
      password
    }
    this.props.dispatch(savePassword(data))
  }

  render() {
    return (
      <ChangePasswordPage
        auth={this.props.auth}
        sendPassword={this.sendPassword}
      />
    )
  }
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps)(ChangePasswordPageContainer)
