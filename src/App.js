import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions/actions'
import Main from './components/Main'

class App extends Component {
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

  render() {
    return (
      <React.Fragment>
        <header className='cribbage-header'>
          <h1 className='cribbage-text'>Cribbage Hand Practice Tool</h1>
          <p className='cribbage-text'>Practice your point counting skills.</p>
          <div className='icon' />
        </header>
        <div className='app'>
          <Main />
        </div>
      </React.Fragment>
    )
  }
}

export default connect((state) => {
  return {
    hand: state.deck.hand,
    cardsLeft: state.deck.cardsLeft,
    deck_id: state.deck.deck_id,
    showError: state.deck.showError,
    error: state.deck.error
  }
})(App)
