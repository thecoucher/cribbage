import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Options = (props) => {
  const showCustomHand = (props.numberOfCards === 5)
  const showResults = props.showResults

  if (showCustomHand) {
    return (
      <div className='cribbage-options'>
        <label className='cribbage-checkbox'>
          <input type='checkbox' checked={props.showCustomHand} onChange={props.setShowCustomHand} />Modify your cards
        </label>
        <label className='cribbage-checkbox'>
          <input type='checkbox' checked={showResults} onChange={props.setShowResults} />{showResults ? 'Hide results' : 'Show results'}
        </label>
      </div>
    )
  } else {
    return (
      <div className='cribbage-options'>
        <label className='cribbage-checkbox'><input type='checkbox' inline='true' checked={showResults} onChange={props.setShowResults} />{showResults ? 'Hide results' : 'Show results'}</label>
      </div>
    )
  }
}
Options.propTypes = {
  showResults: PropTypes.bool.isRequired,
  setShowResults: PropTypes.func.isRequired,
  numberOfCards: PropTypes.number.isRequired
}

export default Options
