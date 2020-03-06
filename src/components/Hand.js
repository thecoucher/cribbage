import React from 'react'
import PropTypes from 'prop-types'
import cardback from './../images/card_back.jpg'

// Component Hand
const Hand = (props) => {
  const cards = props.cards
  const buttonText = props.buttonText
  const cardsLeft = props.cardsLeft
  const showError = props.showError
  const error = props.error
  let cardsImages = []

  if (cards.length > 0) {
    cardsImages = cards.map((card, index) => {
      if (index !== 4) {
        return <img className='card' src={card.image} key={card.code} id={card.code} alt={card.code} />
      } else {
        return <img className='c-card' src={card.image} key={card.code} id={card.code} alt={card.code} />
      }
    })
  } else {
    cardsImages =
      <div>
        <img className='card' src={cardback} alt='1' />
        <img className='card' src={cardback} alt='2' />
        <img className='card' src={cardback} alt='3' />
        <img className='card' src={cardback} alt='4' />
        <img className='c-card' src={cardback} alt='5' />
      </div>

  }
  return (
    <div className='cribbage-parent'>
      <div>
        <button className='cribbage-button' onClick={() => props.getHand()}>{buttonText}</button>
        <button className='cribbage-button' onClick={() => props.sortHand()}>Sort cards</button>
      </div>
      <div style={{ display: (showError ? 'block' : 'none') }}><p className='connection-error'>{error}</p></div>
      <div><p className='cribbage-text'>Cards remaining in deck: {cardsLeft}</p></div>
      {cardsImages}
    </div>
  )
}

Hand.propTypes = {
  getHand: PropTypes.func.isRequired,
  sortHand: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  cardsLeft: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    suit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })).isRequired,
}

export default Hand
