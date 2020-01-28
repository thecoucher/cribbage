import { ActionTypes as types } from '../constants'

var defaultState = {
  'showResults': false,
  'showCustomHand': false,
  'hand': [],
  'cardsLeft': 0
}

function deck(state = defaultState, action) {
  switch (action.type) {
    case types.TOGGLE_SHOW_RESULTS:
      return {
        ...state,
        showResults: !state.showResults,
      }
    case types.TOGGLE_SHOW_CUSTOM_HAND:
      return {
        ...state,
        showCustomHand: !state.showCustomHand,
      }
    case types.GET_NEW_DECK:
      return {
        ...state,
        deck_id: action.data.deck_id,
        cardsLeft: action.data.cardsLeft,
        showResults: action.data.showResults
      }
    case types.GET_NEW_CARDS:
      return {
        ...state,
        hand: action.data.hand,
        cardsLeft: action.data.cardsLeft,
        showResults: action.data.showResults
      }
    case types.SORT_HAND:
      return {
        ...state,
        hand: action.data.sortedHand
      }
    case types.CHANGE_HAND:
      return {
        ...state,
        hand: action.data.newHand
      }
    default:
      return state
  }
}

export default deck
