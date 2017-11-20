import React from 'react'
import { connect } from 'react-redux'
import { clearError } from '../../actions/error'

import ErrorBox from './ErrorBox'

const ErrorBoxContainer = ({ error, clearError }) => {
  return (
    <ErrorBox error={error} clearError={clearError} />
  )
}

const mapStateToProps = state => ({ error: state.error })

const mapDispatchToState = dispatch => ({
  clearError: () => dispatch(clearError())
})

export default connect(mapStateToProps, mapDispatchToState)(ErrorBoxContainer)
