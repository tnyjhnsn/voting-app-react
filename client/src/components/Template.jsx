import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ChangePasswordPage from './account/ChangePasswordPageContainer'
import CreatePollPage from './polls/CreatePollPageContainer'
import ThanksPollCreated from './polls/ThanksPollCreatedContainer'
import ThanksPollUpdated from './polls/ThanksPollUpdatedContainer'
import EditPollPage from './polls/EditPollPageContainer'
import ViewPollPage from './polls/ViewPollPageContainer'
import ErrorBox from './shared/ErrorBoxContainer'
import Header from './shared/HeaderContainer'
import LandingPage from './home/LandingPageContainer'
import LoginPage from './account/LoginPageContainer'
import ListPollsPage from './polls/ListPollsPageContainer'
import RegisterPage from './account/RegisterPageContainer'
import RegisterSuccessPage from './account/RegisterSuccessPageContainer'
import ResetPasswordPage from './account/ResetPasswordPageContainer'
import ThanksVote from './polls/ThanksVoteContainer'

const Template = ({ progress, auth }) => {
  return (
    <Router>
      <div className="wrapper">
        <Header auth={auth} />
        <section className="page-content container-fluid">
          <ErrorBox />
          <Route path="/account/change-password/:hash" component={ChangePasswordPage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/account/register" component={RegisterPage} />
          <Route exact path="/account/register-success" component={RegisterSuccessPage} />
          <Route exact path="/account/reset-password" component={ResetPasswordPage} />
          <Route exact path="/polls" component={ListPollsPage} />
          <Route exact path="/poll/create" component={CreatePollPage} />
          <Route exact path="/poll/create-success" component={ThanksPollCreated} />
          <Route exact path="/poll/edit" component={EditPollPage} />
          <Route exact path="/poll/update-success" component={ThanksPollUpdated} />
          <Route exact path="/poll/view" component={ViewPollPage} />
          <Route exact path="/poll/vote-success" component={ThanksVote} />
        </section>
        <div className="loader-wrapper" style={progress > 0 ? { display: 'block' } : { display: 'none' }}>
          <div className="loader-box">
            <div className="loader">Loading...</div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Template
