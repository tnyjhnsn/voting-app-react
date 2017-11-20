const initialState = {
  viewingMyPolls: false,
  viewPoll: false,
  thanksVote: false,
  thanksPollCreated: false,
  thanksPollUpdated: false,
  polls: [],
  poll: []
}

const polls = (state = initialState, action) => {
  switch (action.type) {
    case 'POLLS_GET_SUCCESS': {
      const newState = Object.assign({}, state)
      newState.polls = action.json.polls
      return newState
    }
    case 'POLL_GET_SUCCESS': {
      const newState = Object.assign({}, state)
      newState.poll = action.json.poll
      return newState
    }
    case 'THANKS_VOTE': {
      const newState = Object.assign({}, state)
      newState.thanksVote = action.bool
      return newState
    }
    case 'THANKS_POLL_CREATED': {
      const newState = Object.assign({}, state)
      newState.thanksPollCreated = action.bool
      return newState
    }
    case 'THANKS_POLL_UPDATED': {
      const newState = Object.assign({}, state)
      newState.thanksPollUpdated = action.bool
      return newState
    }
    case 'POLL_DELETE_SUCCESS': {
      const newState = Object.assign({}, state)
      newState.polls = state.polls.filter(poll => {
        return poll._id !== action.pollId
      })
      return newState
    }
    case 'POLL_VIEW': {
      const newState = Object.assign({}, state)
      newState.viewPoll = action.bool
      return newState
    }
    case 'POLLS_VIEWING_MY': {
      const newState = Object.assign({}, state)
      newState.viewingMyPolls = action.bool
      return newState
    }
    default:
      return state
  }
}

export default polls
