import api from './api'
import { startProgress, stopProgress } from './progress'
import { clearError } from './error'

export const getPollsFailure = error => ({ type: 'POLLS_GET_FAILURE', error })
export const getPollsSuccess = json => ({ type: 'POLLS_GET_SUCCESS', json })
export const deletePollFailure = error => ({ type: 'POLL_DELETE_FAILURE', error })
export const deletePollSuccess = pollId => ({ type: 'POLL_DELETE_SUCCESS', pollId })
export const listMyPolls = bool => ({ type: 'POLLS_LIST_MINE', bool })
export const viewPoll = pollId => ({ type: 'POLL_VIEW', pollId })
export const thanksVote = bool => ({ type: 'THANKS_VOTE', bool })
export const thanksPollCreated = bool => ({ type: 'THANKS_POLL_CREATED', bool })
export const thanksPollUpdated = bool => ({ type: 'THANKS_POLL_UPDATED', bool })

export const getPolls = () => {
  return async (dispatch) => {
    dispatch(clearError())
    dispatch(startProgress())
    await api().get('/polls')
      .then((response) => {
        dispatch(getPollsSuccess(response.data))
        dispatch(viewPoll(false))
      })
      .catch(error => {
        switch (error.response.status) {
          default:
            dispatch(getPollsFailure(new Error('Failed to get list of polls')))
        }
      })
    return dispatch(stopProgress())
  }
}

export const createPoll = poll => {
  return async (dispatch) => {
    dispatch(clearError())
    dispatch(startProgress())
    await api().post('/poll', poll)
      .then((response) => {
        dispatch(thanksPollCreated(true))
      })
      .catch(error => {
        switch (error.response.status) {
          // TODO need more error checking here
          default:
            console.log('fucked up somewhere')
          // dispatch(pollsGetFailure(new Error('Failed to get list of polls')))
        }
      })
    return dispatch(stopProgress())
  }
}

export const incrementVote = answerId => {
  return async (dispatch) => {
    dispatch(clearError())
    dispatch(startProgress())
    await api().put(`/poll/${answerId}`)
      .then((response) => {
        dispatch(thanksVote(true))
      })
      .catch(error => {
        switch (error.response.status) {
          // TODO need more error checking here
          default:
            console.log('fucked up somewhere')
          // dispatch(pollsGetFailure(new Error('Failed to get list of polls')))
        }
      })
    return dispatch(stopProgress())
  }
}

export const updatePoll = poll => {
  return async (dispatch) => {
    dispatch(clearError())
    dispatch(startProgress())
    await api().put('/poll', poll)
      .then((response) => {
        dispatch(thanksPollUpdated(true))
      })
      .catch(error => {
        switch (error.response.status) {
          // TODO need more error checking here
          default:
            console.log('fucked up somewhere')
          // dispatch(pollsGetFailure(new Error('Failed to get list of polls')))
        }
      })
    return dispatch(stopProgress())
  }
}

export const deletePoll = (pollId) => {
  return async (dispatch) => {
    dispatch(clearError())
    dispatch(startProgress())
    await api().delete(`/poll/${pollId}`)
      .then((response) => {
        dispatch(deletePollSuccess(pollId))
      })
      .catch(error => {
        switch (error.response.status) {
          default:
            dispatch(deletePollFailure(new Error('Failed to delete poll')))
        }
      })
    return dispatch(stopProgress())
  }
}
