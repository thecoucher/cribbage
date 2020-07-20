import reducer from '../reducers/deck'
import { ActionTypes as types } from '../constants'

let state = {
  'showResults': false,
  'showCustomHand': false,
  'hideResultsWhenDealt': false,
  'showError': false,
  'error': '',
  'hand': [],
  'cardsLeft': 0
}


describe('deck reducer', () => {
  it('should return the initial default state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        'showResults': false,
        'showCustomHand': false,
        'hideResultsWhenDealt': true,
        'showError': false,
        'error': '',
        'hand': [],
        'cardsLeft': 0
      }
    )
  })

  it('should handle TOGGLE_SHOW_RESULTS', () => {
    expect(
      reducer(state, {
        type: types.TOGGLE_SHOW_RESULTS
      })
    ).toEqual(
      {
        'showResults': true,
        'showCustomHand': false,
        'hideResultsWhenDealt': false,
        'showError': false,
        'error': '',
        'hand': [],
        'cardsLeft': 0
      }
    )
  })
  it('should handle TOGGLE_SHOW_CUSTOM_HAND', () => {
    expect(
      reducer(state, {
        type: types.TOGGLE_SHOW_CUSTOM_HAND
      })
    ).toEqual(
      {
        'showResults': false,
        'showCustomHand': true,
        'hideResultsWhenDealt': false,
        'showError': false,
        'error': '',
        'hand': [],
        'cardsLeft': 0
      }
    )
  })
  it('should handle TOGGLE_HIDE_RESULTS_WHEN_DEALT', () => {
    expect(
      reducer(state, {
        type: types.TOGGLE_HIDE_RESULTS_WHEN_DEALT
      })
    ).toEqual(
      {
        'showResults': false,
        'showCustomHand': false,
        'hideResultsWhenDealt': true,
        'showError': false,
        'error': '',
        'hand': [],
        'cardsLeft': 0
      }
    )
  })

  it('should handle GET_NEW_DECK', () => {
    expect(
      reducer(state, {
        type: types.GET_NEW_DECK,
        data: {
          'deck_id': 'ABCDE12345',
          'cardsLeft': 52,
          'showResults': true
        }
      })
    ).toEqual(
      {
        'showResults': true,
        'showCustomHand': false,
        'hideResultsWhenDealt': false,
        'showError': false,
        'error': '',
        'hand': [],
        'cardsLeft': 0,
        'deck_id': 'ABCDE12345',
        'cardsLeft': 52,
        'showError': false,
        'error': ''
      }
    )
  })

  it('should handle GET_NEW_CARDS', () => {
    expect(
      reducer({ ...state, deck_id: 'ABCDE12345' }, {
        type: types.GET_NEW_CARDS,
        data: {
          'hand': [],
          'cardsLeft': 47,
          'showResults': true
        }
      })
    ).toEqual(
      {
        'showResults': true,
        'showCustomHand': false,
        'hideResultsWhenDealt': false,
        'showError': false,
        'hand': [],
        'cardsLeft': 0,
        'deck_id': 'ABCDE12345',
        'cardsLeft': 47,
        'error': '',
      }
    )
  })

  it('should handle SORT_HAND', () => {
    expect(
      reducer({ ...state, hand: ['c', 'a', 'b'] }, {
        type: types.SORT_HAND,
        data: {
          'sortedHand': ['a', 'b', 'c']
        }
      })
    ).toEqual(
      {
        'showResults': false,
        'showCustomHand': false,
        'hideResultsWhenDealt': false,
        'showError': false,
        'cardsLeft': 0,
        'cardsLeft': 0,
        'error': '',
        'hand': ['a', 'b', 'c']
      }
    )
  })

  it('should handle CHANGE_HAND', () => {
    expect(
      reducer({ ...state, hand: ['x', 'y', 'z'] }, {
        type: types.CHANGE_HAND,
        data: {
          'newHand': ['a', 'b', 'c']
        }
      })
    ).toEqual(
      {
        'showResults': false,
        'showCustomHand': false,
        'hideResultsWhenDealt': false,
        'showError': false,
        'cardsLeft': 0,
        'cardsLeft': 0,
        'error': '',
        'hand': ['a', 'b', 'c']
      }
    )
  })
  it('should handle SHOW_ERROR', () => {
    expect(
      reducer(state, {
        type: types.SHOW_ERROR,
        data: {
          'error': 'This is an error message.'
        }
      })
    ).toEqual(
      {
        'showResults': false,
        'showCustomHand': false,
        'hideResultsWhenDealt': false,
        'showError': true,
        'cardsLeft': 0,
        'cardsLeft': 0,
        'error': 'This is an error message.',
        'hand': []
      }
    )
  })
})
