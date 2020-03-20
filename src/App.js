import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions/actions'
import swal from 'sweetalert'
import Buttons from './components/Buttons'
import Options from './components/Options'
import Hand from './components/Hand'
import Results from './components/Results'
import CustomHand from './forms/CustomHand'

class App extends Component {
  constructor(props) {
    super(props)
    this.getHand = this.getHand.bind(this)
    this.sortHand = this.sortHand.bind(this)
    this.setShowCustomHand = this.setShowCustomHand.bind(this)
    this.setShowResults = this.setShowResults.bind(this)
    this.onCustomHandChange = this.onCustomHandChange.bind(this)
  }


  componentWillUnmount() {
  }

  componentDidMount() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK')
        }
        return response.json()
      }
      )
      .then(result => {
        this.props.dispatch(actions.getNewDeck(result.deck_id, result.remaining, false)
        )
      })
      .catch((error => {
        console.error('A problem occurred fetching the hand: ', error)
        this.props.dispatch(actions.showError(error.message))
      }))
  }

  /**
    * Used to map the value of the card to the code used by the cards API
    */
  codeMap = {
    ACE: 'A',
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 0,
    JACK: 'J',
    QUEEN: 'Q',
    KING: 'K'
  }

  /*
   * Gets a hand (5 cards) from the deckofcards API. A deck must exist.
   *
   * @returns {Cards[]} Array of 5 cards
   * card.code        eg. JS, AD, 9H
   * card.image       eg.
   * card.cardsImages
   * card. suits      eg. SPADES, DIAMONDS, HEARTS
   * card.value       eg. JACK, ACE, 9
   */
  getHand() {
    // make sure there are enough cards left in the deck
    let url
    if (this.props.cardsLeft < 5) {
      swal('New deck', 'There are not enough cards left in the deck. Now using new deck', 'info')
      url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not OK')
          }
          return response.json()
        })
        .then(result => {
          this.props.dispatch(actions.getNewDeck(result.deck_id, result.remaining, false))
          url = 'https://deckofcardsapi.com/api/deck/' + result.deck_id + '/draw/?count=5'
        })
        .then(() => {
          fetch(url)
            .then(response =>
              response.json()
            )
            .then(result => {
              this.props.dispatch(actions.getNewCards(result.cards, result.remaining, false))
            })
        })
        .catch((error => {
          console.error('A problem occurred fetching the hand: ', error)
          this.props.dispatch(actions.showError(error.message))
        }))
    } else {
      url = 'https://deckofcardsapi.com/api/deck/' + this.props.deck_id + '/draw/?count=5'
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not OK')
          }
          return response.json()
        })
        .then(result => {
          this.props.dispatch(actions.getNewCards(result.cards, result.remaining, false))
        })
        .catch((error => {
          console.error('A problem occurred fetching the hand: ', error)
          this.props.dispatch(actions.showError(error.message))
        }))
    }
  }

  /**
     * Compares two cards to determine if the 'val' property of a card in
     * greater of less than another card. Used by the sartHand(method)
     *
     * @param {Card} card Instance of a card.
     * @param {Card} card Instance of the card to compare to.
     * @returns {number} '1' if greater than, '-1' if less than
     */
  compareCardValues(cardA, cardB) {
    let comparison = 0
    if (cardA.val > cardB.val) {
      comparison = 1
    } else if (cardA.val < cardB.val) {
      comparison = -1
    }
    return comparison
  }

  /**
     * Sorts the hand based on the val property of each card in the hand
     *
     */
  sortHand() {
    let sortedHand = [...this.props.hand]
    sortedHand.sort(this.compareCardValues)
    this.props.dispatch(actions.sortHand(sortedHand))
  }

  /**
     * Toggles the value of the 'showCustomHand' state value
     *
     */
  setShowCustomHand() {
    this.props.dispatch(actions.toggleShowCustomHand())
  }

  /**
     * Toggles the value of the 'showResults' state value
     *
     */
  setShowResults() {
    this.props.dispatch(actions.toggleShowResults())
  }
  /**
     * Generates the correct card code based on value and suit
     *
     * @param {string} value value of the card
     * @param {string} suit suit of the card
     * @return {string} the generated code
     */
  getCode(value, suit) {
    return `${this.codeMap[value]}${suit.charAt(0)}`
  }


  /**
     * Determine if the given card already exists in the hand
     *
     * @param {number} position the position in the hand of the card being changed
     * @param {string} value value of the card (could be the value or the suit)
     * @param {string} type flag to indicate if the suit or the value is changing
     * @return {boolean} true if the card already exists in the hand, false if not.
     */
  alreadyExists(position, value, type) {
    const hand = this.props.hand
    let code
    if (type === 'card') {
      const suit = hand[position].suit
      code = this.getCode(value, suit)
    }
    // suit part
    if (type === 'suit') {
      const val = hand[position].value
      code = this.getCode(val, value)
    }
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].code === code) {
        return true
      }
    }
    return false

  }

  /**
     * Change the value of a card in the hand
     *
     * @param {card} card the card that is to be changed
     * @param {string} value the new value
     * @return {card} card the new card with the updated value
     */
  changeCard(card, value) {
    card.value = value

    const newCode = this.getCode(value, card.suit)
    card.code = newCode
    const newImage = `https://deckofcardsapi.com/static/img/${newCode}.png`
    card.image = newImage
    return card
  }

  /**
     * Change the suit of a card in the hand
     *
     * @param {card} card the card that is to be changed
     * @param {string} suit the new suit
     * @return {card} the new card with the updated suit
     */
  changeSuit(card, suit) {
    card.suit = suit
    const newCode = this.getCode(card.value, suit)
    card.code = newCode
    const newImage = `https://deckofcardsapi.com/static/img/${newCode}.png`
    card.image = newImage
    return card
  }

  /**
     * Event fires when a card in the hand has been changed
     *
     * @param {string} name item to be changed ('card' or 'suit')
     * @param {string} value the new value or suit
     */
  onCustomHandChange(name, value) {
    // can determine the position in the hand array from he last character of the name
    let position = name.charAt(name.length - 1) - 1
    let hand = [...this.props.hand]
    let card = hand[position]
    let newCard
    let toChange = name.slice(0, 4)   // 'suit' or 'card'
    if (toChange === 'card') {
      if (!this.alreadyExists(position, value, toChange)) {
        newCard = this.changeCard(card, value)
      } else {
        swal('Oops!', 'You cannot have two identical cards in a hand.', 'warning')
        return
      }
    } else if (toChange === 'suit') {
      if (!this.alreadyExists(position, value, toChange)) {
        newCard = this.changeSuit(card, value)
      } else {
        swal('Oops', 'You cannot have two identical cards in a hand.', 'warning')
        return
      }
    }
    hand[position] = newCard
    this.props.dispatch(actions.changeHand(hand))
  }

  render() {

    const cardsLeft = this.props.cardsLeft
    const setShowCustomHand = this.setShowCustomHand
    const setShowResults = this.setShowResults
    const showResults = this.props.showResults
    const onCustomHandChange = this.onCustomHandChange
    const showError = this.props.showError
    const error = this.props.error
    const hand = this.props.hand
    let cards
    if (hand) {
      cards = hand
    } else {
      cards = []
    }

    let buttonText = ''
    if (cardsLeft === 52) {
      buttonText = 'Let\'s play'
    } else {
      buttonText = 'Get new cards'
    }
    return (
      <React.Fragment>
        <header className='cribbage-header'>
          <h1 className='cribbage-text'>Cribbage Hand Practice Tool</h1>
          <p className='cribbage-text'>Practice your point counting skills.</p>
          <div className='icon' />
        </header>
        <div className='app'>
          <Buttons getHand={this.getHand} sortHand={this.sortHand} buttonText={buttonText} />
          <div className='result-row'>
            <React.Fragment>
              <Hand getHand={this.getHand} sortHand={this.sortHand} cardsLeft={cardsLeft} cards={cards} showError={showError} error={error} />
            </React.Fragment>
          </div>
          <Options setShowCustomHand={setShowCustomHand} onCustomHandChange={onCustomHandChange} numberOfCards={cards.length} showResults={showResults} setShowResults={setShowResults} />
          <CustomHand cards={cards} setShowCustomHand={setShowCustomHand} onCustomHandChange={onCustomHandChange} />
          <Results cards={cards} />
        </div>
      </React.Fragment>
    )
  }
}
export default connect((state, props) => {
  return {
    showResults: state.deck.showResults,
    showCustomHand: state.deck.showCustomHand,
    hand: state.deck.hand,
    cardsLeft: state.deck.cardsLeft,
    deck_id: state.deck.deck_id,
    showError: state.deck.showError,
    error: state.deck.error
  }
})(App)
