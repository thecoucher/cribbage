import React from 'react'
import PropTypes from 'prop-types'

const Options = (props) => {
  const showOptions = (props.numberOfCards === 5)
  const showResults = props.showResults
  const showCustomHand = props.showCustomHand

  if (showOptions) {
    return (
      <div className='cribbage-options'>
        <label className='cribbage-checkbox'>
          <input type='checkbox' checked={showCustomHand} onChange={props.setShowCustomHand} />Modify your cards
        </label>
        <label className='cribbage-checkbox'>
          <input type='checkbox' checked={showResults} onChange={props.setShowResults} />{showResults ? 'Hide results' : 'Show results'}
        </label>
      </div>
    )
  } else {
    return null
  }
}
Options.propTypes = {
  showResults: PropTypes.bool.isRequired,
  setShowResults: PropTypes.func.isRequired,
  numberOfCards: PropTypes.number.isRequired
}

export default Options
