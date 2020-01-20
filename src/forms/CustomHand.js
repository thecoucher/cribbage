import React from 'react'
import '.././index.css'

// Component Hand
const CustomHand = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    props.setShowCustomHand(false)
  }

  const handleChange = (event) => {
    event.preventDefault()
    props.onCustomHandChange(event.target.name, event.target.value)
  }

  const showCardOptions = (name, value) => {
    return (
      <div className='the-cards'>
        <select className='custom-select' value={value} name={name} onChange={handleChange}>
          <option value='ACE'>Ace</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
          <option value='4'>Four</option>
          <option value='5'>Five</option>
          <option value='6'>Six</option>
          <option value='7'>Seven</option>
          <option value='8'>Eight</option>
          <option value='9'>Nine</option>
          <option value='10'>Ten</option>
          <option value='JACK'>Jack</option>
          <option value='QUEEN'>Queen</option>
          <option value='KING'>King</option>
        </select>
      </div>
    )
  }
  const showSuitOptions = (name, suit = 'SPADES') => {
    return (
      <div className='the-suits'>
        <select className='custom-select' value={suit} name={name} onChange={handleChange}>
          <option value='HEARTS'>Hearts</option>
          <option value='DIAMONDS'>Diamonds</option>
          <option value='SPADES'>Spades</option>
          <option value='CLUBS'>Clubs</option>
        </select>
      </div>
    )
  }

  const showCustomHandCheckbox = <div className='show-results'>
    <label className='cribbage-checkbox'> <input type='checkbox' inline='true' checked={props.showCustomHand} onChange={props.setShowCustomHand} />Modify your cards</label>
  </div>

  if (props.cards.length === 5) {
    return (
      <React.Fragment>
        <div>{showCustomHandCheckbox}</div>
        <div style={{ display: (props.showCustomHand ? 'block' : 'none') }}>
          <form onSubmit={handleSubmit}>
            <div id='card-options'>
              <div className='card-option'>
                {showCardOptions('card1', props.cards[0].value)}
                {showSuitOptions('suit1', props.cards[0].suit)}
              </div>
              <div className='card-option'>
                {showCardOptions('card2', props.cards[1].value)}
                {showSuitOptions('suit2', props.cards[1].suit)}
              </div>
              <div className='card-option'>
                {showCardOptions('card3', props.cards[2].value)}
                {showSuitOptions('suit3', props.cards[2].suit)}
              </div>
              <div className='card-option'>
                {showCardOptions('card4', props.cards[3].value)}
                {showSuitOptions('suit4', props.cards[3].suit)}
              </div>
              <div className='card-option'>
                {showCardOptions('card5', props.cards[4].value)}
                {showSuitOptions('suit5', props.cards[4].suit)}
              </div>
            </div>
          </form >
        </div>
      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default CustomHand
