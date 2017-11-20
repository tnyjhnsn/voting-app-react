import React from 'react'
import { connect } from 'react-redux'
import { startProgress, stopProgress } from '../../actions/progress'

import LandingPage from './LandingPage'

const LandingPageContainer = ({ startProgress, stopProgress }) => {
  return (
    <LandingPage
      startProgress={startProgress}
      stopProgress={stopProgress}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  startProgress: () => dispatch(startProgress()),
  stopProgress: () => dispatch(stopProgress())
})

export default connect(null, mapDispatchToProps)(LandingPageContainer)
