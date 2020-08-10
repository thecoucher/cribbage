import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/actions'

class Settings extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
    this.setHideResultsWhenDealt = this.setHideResultsWhenDealt.bind(this)

  }

  /**
     * Toggles the value of the 'hideResultsWhenDealt' state value
     *
     */
  setHideResultsWhenDealt() {
    this.props.dispatch(actions.toggleHideResultsWhenDealt())
  }

  render() {
    const hideResultsWhenDealt = this.props.hideResultsWhenDealt
    return (
      <React.Fragment>
        <div className='cribbage-options'>
          <label className='cribbage-checkbox'>
            <input type='checkbox' checked={hideResultsWhenDealt} onChange={this.setHideResultsWhenDealt} />Hide results when new hand is dealt
          </label>
        </div>
      </React.Fragment>
    )
  }
}

export default connect((state) => {
  return {
    hideResultsWhenDealt: state.deck.hideResultsWhenDealt
  }
})(Settings)
