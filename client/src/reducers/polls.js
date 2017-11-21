const initialState = {
  listMyPolls: false,
  thanksVote: false,
  thanksPollCreated: false,
  thanksPollUpdated: false,
  polls: [],
  selectedPollId: ''
}

const polls = (state = initialState, action) => {
  switch (action.type) {
    case 'POLLS_GET_SUCCESS': {
      return Object.assign({}, state, {
        polls: action.json.polls
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
    case 'POLLS_LIST_MINE': {
      return Object.assign({}, state, {
        listMyPolls: action.bool
      })
    }
    case 'POLL_VIEW': {
      return Object.assign({}, state, {
        selectedPollId: action.pollId
      })
    }
    default:
      return state
  }
}

export default polls
