import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getPairs, getFifteenSums, getFlushes, getNibs, getRuns } from '.././cribbage.js'
const uuid = require('uuid/v4')

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = { showResults: false }

    // all 10 combinations that a run of three can have
    this.patternsOfThree = [
      [0, 1, 2],
      [0, 1, 3],
      [1, 2, 3],
      [0, 1, 4],
      [0, 2, 4],
      [1, 2, 4],
      [0, 3, 4],
      [1, 3, 4],
      [2, 3, 4],
      [0, 2, 3]
    ]
  }

  /**
     * Highlight the cards in the hand that are part of the result
     *
     * @param {cards[]} Array of 5 cards
     */
  addHighlight(cards) {
    const cardsToHighlight = cards.result ? cards.result : cards
    for (var i = 0; i < cardsToHighlight.length; i++) {
      const elem = document.getElementById(cardsToHighlight[i].code)
      if (elem) {
        elem.style.border = '3px solid blue'
        elem.style['border-radius'] = '8px'
      }
    }
  }

  /**
     * Remove highlights on the cards.
     *
     * @param {cards[]} Array of 5 cards
     */
  removeHighlight(cards) {

    const cardsToRemoveHighlight = cards.result ? cards.result : cards
    for (var i = 0; i < cardsToRemoveHighlight.length; i++) {
      const elem = document.getElementById(cardsToRemoveHighlight[i].code)
      if (elem) {
        elem.style.border = null
      }
    }
  }

  /**
     * Adds up all the scores from the various results
     *
     * @param {cards[]} card Array of cards that are pairs
     * @param {cards[]} card Array of cards that sum to 15
     * @param {cards[]} card Array of cards that form a run
     * @param {cards[]} card Array of cards that have the same suit (4 or 5)
     * @param {cards[]} card Array of 2 cards that form nibs
     */
  tallyTheScores(pairResult, sumsResult, runsResult, flushResult, nibsResult) {
    let score = 0
    for (let i = 0; i < pairResult.length; i++) {
      score = score + pairResult[i].score
    }
    for (let i = 0; i < sumsResult.length; i++) {
      score = score + 2
    }
    for (let i = 0; i < runsResult.length; i++) {
      score = score + runsResult[i].length
    }
    if (flushResult.length > 0) {
      score = score + flushResult.length
    }
    if (nibsResult.length > 0) {
      score = score + 1
    }
    return score
  }

  render() {
    let pairResults = []
    const { cards } = this.props

    let displayPairs, displaySums, displayRuns, displayFlush, displayNibs
    let showResults = this.state.showResults
    let sumsResult, flushResult, runsResult, nibsResult
    let fullHand = [...cards]
    let totalScore = 0

    if (fullHand.length === 5) {
      sumsResult = getFifteenSums(fullHand)
      runsResult = getRuns(fullHand)
      pairResults = getPairs(fullHand)
      flushResult = getFlushes(fullHand)
      nibsResult = getNibs(cards)
      // add all the results of the sums
      totalScore = this.tallyTheScores(pairResults, sumsResult, runsResult, flushResult, nibsResult)

    }

    const showResultsCheckbox = <div className='show-results'>
      <label className='cribbage-checkbox'><input type='checkbox' inline='true' checked={showResults} onChange={() => { this.setState({ showResults: !showResults }) }} />{showResults ? 'Hide results' : 'Show results'}</label>
    </div>

    // Only show results if the full hand has been dealt
    if (fullHand.length === 5) {
      displayPairs = <div>{pairResults.map(result =>
        <div key={uuid()}>
          <section className='cribbage-results' onMouseOver={() => this.addHighlight(result)} onMouseOut={() => this.removeHighlight(result)}>
            <div className='card-result'>{result.result.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span className='cribbage-text'>{result.description} - Points: {result.score}</span></div>
          </section>

        </div>
      )}</div>

      displaySums = <div>{sumsResult.map(result =>
        <div key={uuid()}>
          <section className='cribbage-results' onMouseOver={() => this.addHighlight(result)} onMouseOut={() => this.removeHighlight(result)}>
            <div className='card-result'>{result.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span className='cribbage-text'>Sum to 15 - Points: 2</span></div>
          </section>
        </div>
      )}</div>

      displayRuns = <div>{runsResult.map(result =>
        <div key={uuid()}>
          <section className='cribbage-results' onMouseOver={() => this.addHighlight(result)} onMouseOut={() => this.removeHighlight(result)}>
            <div className='card-result'>{result.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span>Run - Points: {result.length}</span></div>
          </section>
        </div>
      )}</div>

      if (nibsResult.length > 0) {
        displayNibs = <div>
          <section className='cribbage-results' onMouseOver={() => this.addHighlight(nibsResult)} onMouseOut={() => this.removeHighlight(nibsResult)}>
            <div className='card-result'>{nibsResult.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span className='cribbage-text'>Nibs - Points: 1</span></div>
          </section>
        </div>
      }
      if (flushResult.length > 0) {
        displayFlush = <div>
          <section className='cribbage-results' onMouseOver={() => this.addHighlight(flushResult)} onMouseOut={() => this.removeHighlight(flushResult)}>
            <div className='card-result'>{flushResult.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span className='cribbage-text'>Flush - Points: {flushResult.length}</span></div>
          </section>
        </div>
      } else {
        displayFlush = <div />
      }
    }

    if (fullHand.length === 5) {
      return <React.Fragment>
        <div>{showResultsCheckbox}</div>
        <div style={{ display: (showResults ? 'block' : 'none') }}>
          <p className='cribbage-text'>Score = {totalScore}</p>
          {displaySums}
          {displayRuns}
          {displayPairs}
          {displayFlush}
          {displayNibs}
        </div>
      </React.Fragment>
    } else {
      return (
        <div>
          {showResultsCheckbox}
        </div>

      )
    }

  }
}

Results.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    suit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  })).isRequired,
  card: PropTypes.shape({
    suit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  })
}

export default Results
