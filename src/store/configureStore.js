import { createStore } from 'redux'

var defaultState = {
  'showResults': false,
  'showCustomHand': false
}

function the_reducer(state = defaultState, action) {

  switch (action.type) {
    case 'TOGGLE_SHOW_RESULTS':
      return {
        ...state,
        showResults: !state.showResults,
      }
    case 'TOGGLE_SHOW_CUSTOM_HAND':
      return {
        ...state,
        showCustomHand: !state.showCustomHand,
      }
    default:
      return state
  }
}

var store = createStore(the_reducer)

export default store
