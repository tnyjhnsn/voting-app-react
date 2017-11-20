import React from 'react'
import { connect } from 'react-redux'
import { logUserOut } from '../../actions/auth'
import Header from './Header'

const HeaderContainer = ({ auth, logUserOut }) => {
  return (
    <Header auth={auth} logUserOut={logUserOut} />
  )
}

const mapDispatchToProps = dispatch => ({
  logUserOut: () => dispatch(logUserOut())
})

export default connect(null, mapDispatchToProps)(HeaderContainer)
