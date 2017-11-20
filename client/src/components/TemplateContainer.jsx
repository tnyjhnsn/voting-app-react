import React from 'react'
import { connect } from 'react-redux'
import { checkSession } from '../actions/auth'

import Template from './Template'

class TemplateContainer extends React.Component {
  componentWillMount() {
    this.props.checkSession()
  }

  render() {
    const { progress, auth } = this.props
    return (
      <Template progress={progress} auth={auth} />
    )
  }
}

const mapStateToProps = state => ({
  progress: state.progress,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  checkSession: () => dispatch(checkSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContainer)
