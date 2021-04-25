// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import { TicTacToe } from './Game'
import each from 'jest-each'

test(`newly started game should have all the cells empty`, () => {
  const game = new TicTacToe('Sophia', 'Olivia')

  const expectedTurnsLeft = 9
  const actualTurnsLeft = game.remainingTurns()

  expect(actualTurnsLeft).toEqual(expectedTurnsLeft)
})

test(`newly started game should have player1 as the first player`, () => {
  const game = new TicTacToe('Sophia', 'Olivia')

  const expectedCurrentPlayer = 'Sophia'
  const actualCurrentPlayer = game.currentPlayer()

  expect(actualCurrentPlayer).toEqual(expectedCurrentPlayer)
})

test(`when player1 plays their turn, player2 should be the current player for the next turn`, () => {
  const game = new TicTacToe('Sophia', 'Olivia')

  game.play(0, 0)
  const expectedCurrentPlayer = 'Olivia'
  const actualCurrentPlayer = game.currentPlayer()

  expect(actualCurrentPlayer).toEqual(expectedCurrentPlayer)
})

test(`when player1 and player2 plays, the turn should cycle back to player`, () => {
  const game = new TicTacToe('Sophia', 'Olivia')

  game.play(0, 0)
  game.play(0, 1)
  const expectedCurrentPlayer = 'Sophia'
  const actualCurrentPlayer = game.currentPlayer()

  expect(actualCurrentPlayer).toEqual(expectedCurrentPlayer)
})

describe(`no player can play and already played cell in the grid`, () => {
  each([
    [
      [
        [0, 0],
        [1, 1],
        [0, 0],
      ],
    ],
    [
      [
        [0, 0],
        [1, 1],
        [2, 0],
        [0, 0],
      ],
    ],
  ]).test(`when players play their turns in the sequence %d`, (turns: Array<Array<number>>) => {
    const game = new TicTacToe('Sophia', 'Olivia')
    let successfulTurns = true
    turns.forEach((turn) => {
      successfulTurns = game.canPlay(turn[0], turn[1])
      game.play(turn[0], turn[1])
    })
    expect(successfulTurns).toEqual(false)
  })
})

describe(`players can play in empty cells in the grid`, () => {
  each([
    [
      [
        [0, 0],
        [1, 1],
      ],
    ],
    [
      [
        [0, 0],
        [1, 1],
        [2, 0],
      ],
    ],
  ]).test(`when players play their turns in the sequence %d`, (turns: Array<Array<number>>) => {
    const game = new TicTacToe('Sophia', 'Olivia')
    let successfulTurns = true
    turns.forEach((turn) => {
      successfulTurns = game.canPlay(turn[0], turn[1])
    })
    expect(successfulTurns).toEqual(true)
  })
})

// TODO add the cases for this test
describe(`first player wins against second player`, () => {
  each([[[]], [[]], [[]], [[]], [[]], [[]], [[]], [[]]])
})

// TODO add the cases for this test
describe(`first player wins against second player`, () => {
  each([[[]], [[]], [[]], [[]], [[]], [[]], [[]], [[]]])
})
