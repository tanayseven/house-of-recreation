// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import { Message } from '../communication/CommunicationClient'

export interface Game {
  setPlayers: (players: Array<string>) => void
  setReceiveMessage: (handler: (message: Message) => void) => void
  setSendMessage: (handler: (message: Message) => void) => void
  start: () => void
  end: () => void
  get(row: number, column: number): string
  canPlay(row: number, column: number): boolean
  play(row: number, column: number): void
}
