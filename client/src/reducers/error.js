const initialState = {
  isError: false,
  error: {}
}

const error = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_FAILURE':
    case 'AUTH_LOGOUT_FAILURE':
    case 'AUTH_REGISTRATION_FAILURE':
    case 'AUTH_PASSWORD_RESET_HASH_FAILURE':
    case 'AUTH_PASSWORD_SAVE_FAILURE':
    case 'POLLS_GET_FAILURE':
    case 'POLL_GET_FAILURE':
    case 'POLL_DELETE_FAILURE': {
      const newState = Object.assign({}, initialState)
      newState.isError = true
      newState.error = action.error
      return newState
    }
    case 'ERROR_CLEARED': {
      const newState = Object.assign({}, initialState)
      return newState
    }
    default:
      return state
  }
}

export default error
