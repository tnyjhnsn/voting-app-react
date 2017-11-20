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
      return Object.assign({}, state, {
        polls: action.json.polls
      })
    }
    case 'POLL_GET_SUCCESS': {
      return Object.assign({}, state, {
        poll: action.json.poll
      })
    }
    case 'THANKS_VOTE': {
      return Object.assign({}, state, {
        thanksVote: action.bool
      })
    }
    case 'THANKS_POLL_CREATED': {
      return Object.assign({}, state, {
        thanksPollCreated: action.bool
      })
    }
    case 'THANKS_POLL_UPDATED': {
      return Object.assign({}, state, {
        thanksPollUpdated: action.bool
      })
    }
    case 'POLL_DELETE_SUCCESS': {
      return Object.assign({}, state, {
        polls: state.polls.filter(poll => poll._id !== action.pollId)
      })
    }
    case 'POLL_VIEW': {
      return Object.assign({}, state, {
        viewPoll: action.bool
      })
    }
    case 'POLLS_VIEWING_MY': {
      return Object.assign({}, state, {
        viewingMyPolls: action.bool
      })
    }
    default:
      return state
  }
}

export default polls
