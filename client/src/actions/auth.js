import api from './api'
import { startProgress, stopProgress } from './progress'
import { clearError } from './error'

export const loginAttempt = () => ({ type: 'AUTH_LOGIN_ATTEMPT' })
export const loginFailure = error => ({ type: 'AUTH_LOGIN_FAILURE', error })
export const loginSuccess = json => ({ type: 'AUTH_LOGIN_SUCCESS', json })
export const logoutFailure = error => ({ type: 'AUTH_LOGOUT_FAILURE', error })
export const logoutSuccess = () => ({ type: 'AUTH_LOGOUT_SUCCESS' })
export const passwordResetHashCreated = () => ({ type: 'AUTH_PASSWORD_RESET_HASH_CREATED' })
export const passwordResetHashFailure = error => ({ type: 'AUTH_PASSWORD_RESET_HASH_FAILURE', error })
export const passwordResetClear = () => ({ type: 'AUTH_PASSWORD_RESET_CLEAR' })
export const passwordSaveClear = () => ({ type: 'AUTH_PASSWORD_SAVE_FAILURE' })
export const passwordSaveFailure = error => ({ type: 'AUTH_PASSWORD_SAVE_FAILURE', error })
export const passwordSaveSuccess = () => ({ type: 'AUTH_PASSWORD_SAVE_SUCCESS' })
export const registrationFailure = error => ({ type: 'AUTH_REGISTRATION_FAILURE', error })
export const thanksRegistration = bool => ({ type: 'THANKS_REGISTRATION', bool })
export const sessionCheckFailure = () => ({ type: 'AUTH_SESSION_CHECK_FAILURE' })
export const sessionCheckSuccess = json => ({ type: 'AUTH_SESSION_CHECK_SUCCESS', json })

export const checkSession = () => {
  return async (dispatch) => {
    dispatch(startProgress())
    const _id = sessionStorage.getItem('pollster_id')
    if (_id) {
      const username = sessionStorage.getItem('pollster_username')
      dispatch(sessionCheckSuccess({ _id, username }))
    } else {
      dispatch(sessionCheckFailure())
    }
    return dispatch(stopProgress())
  }
}

export const createHash = username => {
  return async (dispatch) => {
    dispatch(clearError())
    dispatch(startProgress())
    await api().post('/createhash', { username: username })
      .then((response) => {
        dispatch(passwordResetHashCreated(response.data))
      })
      .catch(error => {
        switch (error.response.status) {
          case 404:
            dispatch(passwordResetHashFailure(new Error('Email not found. Please try again.')))
            break
          case 460:
            dispatch(passwordResetHashFailure(new Error('Saving hash failed. Please try again.')))
            break
          case 461:
            dispatch(passwordResetHashFailure(new Error('Sending email failed. Please try again')))
            break
          default:
            dispatch(passwordResetHashFailure(new Error('Unknown error creating hash')))
        }
      })
    return dispatch(stopProgress())
  }
}

export const logUserIn = userData => {
  return async (dispatch) => {
    dispatch(startProgress())
    dispatch(loginAttempt())
    await api().post('/login', userData)
      .then((response) => {
        const data = response.data
        sessionStorage.setItem('pollster_id', data.user._id)
        sessionStorage.setItem('pollster_username', data.user.username)
        dispatch(loginSuccess(data.user))
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            dispatch(loginFailure(new Error('Invalid email or password. Please try again.')))
            break
          default:
            dispatch(loginFailure(new Error('Unknown error logging in')))
        }
      })
    return dispatch(stopProgress())
  }
}

export const logUserOut = () => {
  return async (dispatch) => {
    dispatch(startProgress())
    await api().get('/logout')
      .then((response) => {
        sessionStorage.removeItem('pollster_id')
        sessionStorage.removeItem('pollster_username')
        dispatch(logoutSuccess())
      })
      .catch((error) => {
        dispatch(logoutFailure(new Error('Failed to log out properly')))
      })
    return dispatch(stopProgress())
  }
}

export const registerUser = userData => {
  return async (dispatch) => {
    dispatch(startProgress())
    await api().post('/register', userData)
      .then((response) => {
        const user = response.data
        sessionStorage.setItem('pollster_id', user._id)
        sessionStorage.setItem('pollster_username', user.username)
        dispatch(thanksRegistration(true))
        dispatch(loginSuccess(user))
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            dispatch(registrationFailure(new Error('Cannot register user')))
            break
          case 401:
            dispatch(registrationFailure(new Error('That email already exists')))
            break
          case 460:
            dispatch(registrationFailure(new Error('Invalid registration')))
            break
          case 461:
            dispatch(registrationFailure(new Error('Please use a valid email address')))
            break
          case 462:
            dispatch(registrationFailure(new Error(`Please use a password between 6 and 32 characters long,
              and containing only lower or upercase alphanumeric characters`)))
            break
          default:
            dispatch(registrationFailure(new Error('Unknown error registering user')))
        }
      })
    return dispatch(stopProgress())
  }
}

export const savePassword = data => {
  return async (dispatch) => {
    dispatch(clearError())
    dispatch(startProgress())
    await api().post('/savepassword', data)
      .then((response) => {
        dispatch(passwordSaveSuccess())
      }).catch((error) => {
        switch (error.response.status) {
          default:
            dispatch(passwordSaveFailure(new Error('Cannot save password')))
        }
      })
    return dispatch(stopProgress())
  }
}
