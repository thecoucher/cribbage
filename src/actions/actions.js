export function toggleShowResults() {
  return {
    type: 'TOGGLE_SHOW_RESULTS'
  }
}

export function toggleShowCustomHand() {
  return {
    type: 'TOGGLE_SHOW_CUSTOM_HAND'
  }
}

export function getNewDeck(deck_id, cardsLeft, showResults) {
  return {
    type: 'GET_NEW_DECK',
    data: { deck_id: deck_id, cardsLeft: cardsLeft, showResults: showResults }
  }
}

export function getNewCards(cards, cardsLeft, showResults) {
  return {
    type: 'GET_NEW_CARDS',
    data: { hand: cards, cardsLeft: cardsLeft, showResults: showResults }
  }
}
