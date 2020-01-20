import React from 'react'
import PropTypes from 'prop-types'

// Component Hand
const Hand = (props) => {
  const cards = props.cards
  const buttonText = props.buttonText
  const cardsLeft = props.cardsLeft

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
      <div className='cribbage-section'>
        <img className='card' src='./card_back.jpg' alt='1' />
        <img className='card' src='./card_back.jpg' alt='2' />
        <img className='card' src='./card_back.jpg' alt='3' />
        <img className='card' src='./card_back.jpg' alt='4' />
        <img className='c-card' src='./card_back.jpg' alt='5' />
      </div>

  }
  return (
    <div className='cribbage-parent'>
      <header className='cribbage-header'>
        <button className='cribbage-button' onClick={() => props.getHand()}>{buttonText}</button>
        <button className='cribbage-button' onClick={() => props.sortHand()}>Sort cards</button>
      </header>
      <div><p className='cribbage-text'>Cards remaining in deck: {cardsLeft}</p></div>
      <section>
        <div>{cardsImages}</div>
      </section>
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
