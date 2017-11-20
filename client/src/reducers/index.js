import { combineReducers } from 'redux'
import auth from '../reducers/auth'
import error from '../reducers/error'
import progress from '../reducers/progress'
import polls from '../reducers/polls'

const reducers = {
  error,
  auth,
  progress,
  polls
}

export default combineReducers(reducers)
