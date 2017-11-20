const initialState = false

const progress = (state = initialState, action) => {
  switch (action.type) {
    case 'START_PROGRESS': return true
    case 'STOP_PROGRESS': return false
    default: return state
  }
}

export default progress
