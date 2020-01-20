import React from 'react';
import ReactDOM from 'react-dom'
import Deck from './../Deck'

describe.only("Testing the Deck component", () => {
  let result
  let input = {
    card: {
      code: 'CC',
      image: 'DD'
    }
  }
  beforeAll(() => {
    result = Deck(input)
  })
  it("should pass", () => {
    // expect(1 + 1).toEqual(2)
    expect(result.type).toBe('div')
  })
})

describe('When testing with ReactDOM', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const card = { code: 'CC', image: 'DD' }
    ReactDOM.render(<Deck card={card} />, div)
  })
})
