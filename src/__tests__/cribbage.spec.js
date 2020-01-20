import { getPairs, getFifteenSums, getFlushes, getNibs, getRuns } from '../cribbage.js'
// sample cards used in tests
const cardKC = { code: 'KC', suit: 'CLUBS', value: 'KING' }
const cardKH = { code: 'KH', suit: 'HEARTS', value: 'KING' }
const cardQC = { code: 'QC', suit: 'CLUBS', value: 'QUEEN' }
const cardQS = { code: 'QS', suit: 'SPADES', value: 'QUEEN' }
const cardQH = { code: 'QH', suit: 'HEARTS', value: 'QUEEN' }
const cardQD = { code: 'QD', suit: 'DIAMONDS', value: 'QUEEN' }
const cardJH = { code: 'JH', suit: 'HEARTS', value: 'JACK' }
const card9D = { code: '9D', suit: 'DIAMONDS', value: '9' }
const card8D = { code: '8D', suit: 'DIAMONDS', value: '8' }
const card8H = { code: '8H', suit: 'HEARTS', value: '8' }
const card7D = { code: '7D', suit: 'DIAMONDS', value: '7' }
const card7H = { code: '7H', suit: 'HEARTS', value: '7' }
const card6S = { code: '6S', suit: 'SPADES', value: '6' }
const card6H = { code: '6H', suit: 'HEARTS', value: '6' }
const card5D = { code: '5D', suit: 'DIAMONDS', value: '5' }
const card4H = { code: '4H', suit: 'HEARTS', value: '4' }
const card3H = { code: '3H', suit: 'HEARTS', value: '3' }
const card2H = { code: '2H', suit: 'HEARTS', value: '2' }
const cardAC = { code: 'AC', suit: 'CLUBS', value: 'ACE' }
const cardAS = { code: 'AS', suit: 'SPADES', value: 'ACE' }

describe("Function getPairs()", () => {
  test("it should return a single pair", () => {
    const result = [
      { description: 'Pair', result: [cardQC, cardQS], score: 2 }]
    const hand = [cardQC, cardQS, card7H, cardKH, card8D]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return a single pair of Aces", () => {
    const result = [
      { description: 'Pair', result: [cardAC, cardAS], score: 2 }]
    const hand = [cardAC, cardQS, cardAS, cardKH, card8D]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return two pairs", () => {
    const result = [
      { description: 'Pair', result: [cardQC, cardQS], score: 2 },
      { description: 'Pair', result: [cardKC, cardKH], score: 2 }
    ]
    const hand = [cardQC, cardQS, card7H, cardKC, cardKH]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return three of a kind", () => {
    const result = [
      { description: 'Three of a kind', result: [cardQC, cardQS, cardQH], score: 6 }]
    const hand = [cardQC, cardQS, cardQH, cardKH, card8D]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return four of a kind", () => {
    const result = [
      { description: 'Four of a kind', result: [cardQC, cardQS, cardQH, cardQD], score: 12 }]
    const hand = [cardQC, cardQS, cardQH, cardKH, cardQD]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should not return a result if there are no pairs", () => {
    const result = []
    const hand = [card2H, card4H, cardJH, cardKH, cardQD]
    expect(getPairs(hand)).toEqual(result)
  })
})

describe("Function getFifteenSums()", () => {
  test("it should return four results of pairs that sum to 15", () => {
    const result = [
      [card8D, card7D],
      [card8D, card7H],
      [card8H, card7D],
      [card8H, card7H],
    ]
    const hand = [card8D, card8H, card7D, cardKH, card7H]
    expect(getFifteenSums(hand)).toEqual(result)
  })
  test("it should return two results of 3 cards that sum to 15", () => {
    const result = [
      [card4H, cardAC, cardKH],
      [card4H, cardAC, cardQH]
    ]
    const hand = [card4H, cardAC, card7D, cardKH, cardQH]
    expect(getFifteenSums(hand)).toEqual(result)
  })
  test("it should return two results of 4 cards that sum to 15", () => {
    const result = [
      [card3H, cardAC, cardAS, cardQH],
      [card3H, cardAC, cardAS, cardKH]
    ]
    const hand = [card3H, cardAC, cardAS, cardKH, cardQH]
    expect(getFifteenSums(hand)).toEqual(result)
  })
  test("it should return one result of 5 cards that sum to 15", () => {
    const result = [
      [card3H, cardAC, cardAS, card4H, card6S]
    ]
    const hand = [card3H, cardAC, cardAS, card4H, card6S]
    expect(getFifteenSums(hand)).toEqual(result)
  })
  test("it should not return a result when there are no sums", () => {
    const result = []
    const hand = [card3H, cardAC, cardAS, card2H, card6S]
    expect(getFifteenSums(hand)).toEqual(result)
  })
})
describe("Function getFlushes()", () => {
  test("it should return one result of 4 cards of the same suit", () => {
    const result = [card2H, card4H, card6H, card8H]
    const hand = [card2H, card4H, card6H, card8H, cardQS]
    expect(getFlushes(hand)).toEqual(result)
  })
  test("it should return one result of 5 cards of the same suit", () => {
    const result = [card2H, card4H, card6H, card8H, cardQH]
    const hand = [card2H, card4H, card6H, card8H, cardQH]
    expect(getFlushes(hand)).toEqual(result)
  })
  test("it should not return a result if there is no flush", () => {
    const result = []
    const hand = [card2H, card4H, card6S, card8H, cardQH]
    expect(getFlushes(hand)).toEqual(result)
  })
})
describe("Function getNibs()", () => {
  test("it should return one result of two cards with nibs", () => {
    const result = [cardJH, cardQH]
    const hand = [cardJH, card4H, card6H, card8H]
    expect(getNibs(hand, cardQH)).toEqual(result)
  })
  test("it should not return a result of two cards with no mathcing suit", () => {
    const result = []
    const hand = [cardJH, card4H, card6H, card8H]
    expect(getNibs(hand, cardQS)).toEqual(result)
  })
})
describe("Function getRuns()", () => {
  test("it should return one result of five cards in sequence", () => {
    const result = [[card4H, card5D, card6S, card7H, card8H]]
    const hand = [card7H, card5D, card8H, card6S, card4H]
    expect(JSON.stringify(getRuns(hand))).toEqual(JSON.stringify(result))
  })
  test("it should return one result of four cards in sequence", () => {
    const result = [[card5D, card6S, card7H, card8H]]
    const hand = [card7H, card5D, card8H, card6S, card2H]
    expect(JSON.stringify(getRuns(hand))).toEqual(JSON.stringify(result))
  })
  test("it should return two results of four cards in sequence", () => {
    const result = [[card6H, card7H, card8D, card9D], [card6H, card7H, card8H, card9D]]
    const hand = [card7H, card8D, card8H, card9D, card6H]
    expect(JSON.stringify(getRuns(hand))).toEqual(JSON.stringify(result))
  })
  test("it should return one result of three cards in sequence", () => {
    const result = [[card6S, card7H, card8H]]
    const hand = [card7H, card4H, card8H, card6S, card2H]
    expect(JSON.stringify(getRuns(hand))).toEqual(JSON.stringify(result))
  })
  test("it should return two results of three cards in sequence", () => {
    const result = [[card6S, card7H, card8H], [card6H, card7H, card8H]]
    const hand = [card7H, card4H, card8H, card6S, card6H]
    expect(JSON.stringify(getRuns(hand))).toEqual(JSON.stringify(result))
  })
  test("it should not return a result when there are no runs", () => {
    const result = []
    const hand = [cardJH, card4H, card6H, card8H]
    expect(getNibs(hand, cardQS)).toEqual(result)
  })
})
