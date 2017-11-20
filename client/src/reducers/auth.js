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
      return Object.assign({}, state, {
        isLoggingIn: true
      })
    }
    case 'AUTH_LOGIN_FAILURE':
    case 'AUTH_SESSION_CHECK_FAILURE':
    case 'AUTH_LOGOUT_SUCCESS': {
      const newState = Object.assign({}, initialState)
      return newState
    }
    case 'AUTH_LOGIN_SUCCESS':
    case 'AUTH_SESSION_CHECK_SUCCESS': {
      return Object.assign({}, state, {
        id: action.json._id,
        isLoggedIn: true,
        isLoggingIn: false,
        username: action.json.username
      })
    }
    case 'AUTH_LOGOUT_FAILURE':
    case 'AUTH_REGISTRATION_FAILURE': {
      return state
    }
    case 'AUTH_PASSWORD_RESET_CLEAR':
    case 'AUTH_PASSWORD_RESET_HASH_FAILURE': {
      return Object.assign({}, state, {
        isPasswordReset: false
      })
    }
    case 'AUTH_PASSWORD_RESET_HASH_CREATED': {
      return Object.assign({}, state, {
        isPasswordReset: true
      })
    }
    case 'AUTH_PASSWORD_SAVE_CLEAR': {
      Object.assign({}, state, {
        isPasswordChanged: false
      })
    }
    case 'AUTH_PASSWORD_SAVE_SUCCESS': {
      return Object.assign({}, state, {
        isPasswordChanged: true
      })
    }
    case 'THANKS_REGISTRATION': {
      return Object.assign({}, state, {
        thanksRegistration: true
      })
    }
    default:
      return state
  }
}

export default auth
