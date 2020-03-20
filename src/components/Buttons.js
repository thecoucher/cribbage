import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Buttons = (props) => {
  const buttonText = props.buttonText

  return (
    <div className='cribbage-buttons'>
      <button className='cribbage-button' onClick={() => props.getHand()}>{buttonText}</button>
      <button className='cribbage-button' onClick={() => props.sortHand()}>Sort cards</button>
    </div>
  )
}
Buttons.propTypes = {
  getHand: PropTypes.func.isRequired,
  sortHand: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default Buttons
