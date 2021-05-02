/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import { createContext } from 'react'
import * as O from 'fp-ts/Option'
import CommunicationClient from './communication/CommunicationClient'
import { pipe } from 'fp-ts/function'
import { Game } from './board/Game'

export class ActiveGame {
  communicationClient: O.Option<CommunicationClient> = O.none
  game: O.Option<Game> = O.none
  setActiveGame = (communicationClient: CommunicationClient, game: Game): void => {
    pipe(
      this.communicationClient,
      O.map((communicationClient_) => communicationClient_.disconnect()),
    )
    this.communicationClient = O.some(communicationClient)

    pipe(
      this.game,
      O.map((game_) => game_.end()),
    )
    this.game = O.some(game)

    // TODO wire them together
  }
}

export const ActiveGameContext = createContext<ActiveGame>(new ActiveGame())
