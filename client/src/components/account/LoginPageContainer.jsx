import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logUserIn } from '../../actions/auth'

import CredentialsPage from './CredentialsPage'

const LoginPageContainer = ({ auth, logUserIn }) => {
  if (auth.isLoggedIn) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <CredentialsPage
      credentialsFunction={logUserIn}
      buttonLabel="Log In"
      forgotPasswordLink
    />
  )
}

const mapStateToProps = state => ({ auth: state.auth })

const mapDispatchToProps = dispatch => ({
  logUserIn: userData => dispatch(logUserIn(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer)
