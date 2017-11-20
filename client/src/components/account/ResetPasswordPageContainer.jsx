import React from 'react'
import { connect } from 'react-redux'
import { createHash, passwordResetClear } from '../../actions/auth'

import ResetPasswordPage from './ResetPasswordPage'

const ResetPasswordPageContainer = ({
  createHash,
  passwordResetClear,
  auth: { isPasswordReset }
}) => {
  return (
    <ResetPasswordPage
      createHash={createHash}
      isPasswordRest={isPasswordReset}
      passwordResetClear={passwordResetClear}
    />
  )
}

const mapStateToProps = state => ({ auth: state.auth })

const mapDispatchToProps = dispatch => ({
  createHash: username => dispatch(createHash(username)),
  passwordResetClear: () => dispatch(passwordResetClear())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPageContainer)
