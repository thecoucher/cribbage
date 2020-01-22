import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

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

// create our own logger with the setting we want
var logger = createLogger({
  collapsed: true
})

var store = createStore(
  the_reducer,
  // Note: logger must be the last middleware to be applied
  applyMiddleware(thunk, logger)
)

export default store
