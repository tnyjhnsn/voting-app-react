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
      return Object.assign({}, initialState, {
        isError: true,
        error: action.error
      })
    }
    case 'ERROR_CLEARED': {
      return Object.assign({}, initialState)
    }
    default:
      return state
  }
}

export default error
