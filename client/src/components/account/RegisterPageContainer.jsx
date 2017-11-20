import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/auth'

import CredentialsPage from './CredentialsPage'

const RegisterPageContainer = ({ registerUser, auth: { isLoggedIn, thanksRegistration } }) => {
  if (thanksRegistration) {
    return (<Redirect to="/account/register-success" />)
  }
  if (isLoggedIn) {
    return (<p>Please log out before registering a new user</p>)
  }
  return (
    <CredentialsPage
      credentialsFunction={registerUser}
      buttonLabel="Register"
    />
  )
}

const mapStateToProps = state => ({ auth: state.auth })

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer)
