const initialState = {
  id: '',
  isLoggedIn: false,
  isLoggingIn: false,
  thanksRegistration: false,
  isPasswordReset: false,
  isPasswordChanged: false,
  username: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_ATTEMPT': {
      const newState = Object.assign({}, state)
      newState.isLoggingIn = true
      return newState
    }
    case 'AUTH_LOGIN_FAILURE':
    case 'AUTH_SESSION_CHECK_FAILURE':
    case 'AUTH_LOGOUT_SUCCESS': {
      const newState = Object.assign({}, initialState)
      return newState
    }
    case 'AUTH_LOGIN_SUCCESS':
    case 'AUTH_SESSION_CHECK_SUCCESS': {
      const newState = Object.assign({}, state)
      newState.id = action.json._id
      newState.isLoggedIn = true
      newState.isLoggingIn = false
      newState.username = action.json.username
      return newState
    }
    case 'AUTH_LOGOUT_FAILURE':
    case 'AUTH_REGISTRATION_FAILURE': {
      return state
    }
    case 'AUTH_PASSWORD_RESET_CLEAR':
    case 'AUTH_PASSWORD_RESET_HASH_FAILURE': {
      const newState = Object.assign({}, state)
      newState.isPasswordReset = false
      return newState
    }
    case 'AUTH_PASSWORD_RESET_HASH_CREATED': {
      const newState = Object.assign({}, state)
      newState.isPasswordReset = true
      return newState
    }
    case 'AUTH_PASSWORD_SAVE_CLEAR': {
      const newState = Object.assign({}, state)
      newState.isPasswordChanged = false
      return newState
    }
    case 'AUTH_PASSWORD_SAVE_SUCCESS': {
      const newState = Object.assign({}, state)
      newState.isPasswordChanged = true
      return newState
    }
    case 'THANKS_REGISTRATION': {
      const newState = Object.assign({}, state)
      newState.thanksRegistration = true
      return newState
    }
    default:
      return state
  }
}

export default auth
