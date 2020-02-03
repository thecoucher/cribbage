import { ActionTypes as types } from '.././constants'
export function toggleShowResults() {
  return {
    type: types.TOGGLE_SHOW_RESULTS
  }
}

export function toggleShowCustomHand() {
  return {
    type: types.TOGGLE_SHOW_CUSTOM_HAND
  }
}

export function getNewDeck(deck_id, cardsLeft, showResults) {
  return {
    type: types.GET_NEW_DECK,
    data: { deck_id: deck_id, cardsLeft: cardsLeft, showResults: showResults }
  }
}

export function getNewCards(cards, cardsLeft, showResults) {
  return {
    type: types.GET_NEW_CARDS,
    data: { hand: cards, cardsLeft: cardsLeft, showResults: showResults }
  }
}

export function sortHand(sortedHand) {
  return {
    type: types.SORT_HAND,
    data: { sortedHand: sortedHand }
  }
}

export function changeHand(newHand) {
  return {
    type: types.CHANGE_HAND,
    data: { newHand: newHand }
  }
}

export function showError(error) {
  return {
    type: types.SHOW_ERROR,
    data: { error: error }
  }
}
