// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import { Game } from '../board/Game'
import { Message } from '../communication/CommunicationClient'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

type XO = ' ' | 'X' | 'O'

export class TicTacToe implements Game {
  private players: O.Option<Array<string>> = O.none
  private receiveMessage: O.Option<(message: Message) => void> = O.none
  private sendMessage: O.Option<(message: Message) => void> = O.none
  setPlayers = (players: string[]): void => {
    this.players = O.some(players)
  }
  setReceiveMessage = (handler: (message: Message) => void): void => {
    this.receiveMessage = O.some(handler)
  }
  setSendMessage = (handler: (message: Message) => void): void => {
    this.sendMessage = O.some(handler)
  }
  start = (): void => {
    console.log(`Game started`)
  }
  end = (): void => {
    console.log(`Game over`)
  }

  cells: Array<Array<XO>> = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]

  currentPlayerIndex = 0

  playerSigns: Array<XO> = ['X', 'O']

  canPlay(row: number, column: number): boolean {
    return this.cells[row][column] === ' '
  }

  play(row: number, column: number): void {
    // this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
    if (this.canPlay(row, column)) this.cells[row][column] = this.playerSigns[this.currentPlayerIndex]
  }

  get(row: number, column: number): XO {
    return this.cells[row][column]
  }

  remainingTurns(): number {
    let sum = 0
    this.cells.forEach((row) =>
      row.forEach((cell) => {
        if (cell === ' ') {
          sum++
        }
      }),
    )
    return sum
  }

  currentPlayer(): string {
    return pipe(
      this.players,
      O.map((players) => players[0]),
      O.getOrElse(() => 'no player'),
    )
  }
}
