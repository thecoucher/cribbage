import React, { Component } from 'react'
import swal from 'sweetalert'
import Hand from './components/Hand'
import Results from './components/Results'
import CustomHand from './forms/CustomHand'

class App extends Component {
  constructor(props) {
    super(props)
    this.getHand = this.getHand.bind(this)
    this.sortHand = this.sortHand.bind(this)
    this.setShowCustomHand = this.setShowCustomHand.bind(this)
    this.onCustomHandChange = this.onCustomHandChange.bind(this)
    this.state = {
      'deck': [],
      'hand': [],
      'customHand': [],
      'cardsLeft': 52,
      'showCustomHand': false
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    fetch(url)
      .then(response =>
        response.json()
      )
      .then(result => {
        this.setState({
          deck_id: result.deck_id,
          cardsLeft: result.remaining
        })
      })
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
    if (this.state.cardsLeft < 5) {
      swal('New deck', 'There are not enough cards left in the deck. Now using new deck', 'info')
      url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      fetch(url)
        .then(response =>
          response.json()
        )
        .then(result => {
          this.setState({
            deck_id: result.deck_id,
            cardsLeft: result.remaining
          })
          url = 'https://deckofcardsapi.com/api/deck/' + result.deck_id + '/draw/?count=5'
        })
        .then(() => {
          fetch(url)
            .then(response =>
              response.json()
            )
            .then(result => {
              this.setState({
                hand: result.cards,
                cardsLeft: result.remaining
              })
            })
        })
    } else {
      url = 'https://deckofcardsapi.com/api/deck/' + this.state.deck_id + '/draw/?count=5'
      fetch(url)
        .then(response =>
          response.json()
        )
        .then(result => {
          this.setState({
            hand: result.cards,
            cardsLeft: result.remaining
          })
        })
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
    let sortedHand = [...this.state.hand]
    sortedHand.sort(this.compareCardValues)
    this.setState({
      hand: sortedHand
    })
  }

  /**
     * Toggles the value of the 'showCustomHand' state value
     *
     */
  setShowCustomHand() {
    let showCustomHand = this.state.showCustomHand
    this.setState({ showCustomHand: !showCustomHand })
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
    let code
    if (type === 'card') {
      const suit = this.state.hand[position].suit
      code = this.getCode(value, suit)
    }
    // suit part
    if (type === 'suit') {
      const val = this.state.hand[position].value
      code = this.getCode(val, value)
    }
    for (let i = 0; i < this.state.hand.length; i++) {
      if (this.state.hand[i].code === code) {
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
    let hand = [...this.state.hand]
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
    this.setState({ hand })
  }

  render() {

    const cardsLeft = this.state.cardsLeft
    const showCustomHand = this.state.showCustomHand
    const setShowCustomHand = this.setShowCustomHand
    const onCustomHandChange = this.onCustomHandChange

    let cards
    if (this.state.hand) {
      cards = this.state.hand
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
      <div className='container'>
        <h1 className='cribbage-text'>Cribbage Hand Practice Tool</h1>
        <p className='cribbage-text'>Practice your point counting skills.</p>

        <div className='result-row'>
          <React.Fragment>
            <Hand getHand={this.getHand} sortHand={this.sortHand} cardsLeft={cardsLeft} cards={cards} buttonText={buttonText} />
          </React.Fragment>
        </div>
        <CustomHand cards={cards} showCustomHand={showCustomHand} setShowCustomHand={setShowCustomHand} onCustomHandChange={onCustomHandChange} />
        <Results cards={cards} />
      </div>
    )
  }
}
export default App
