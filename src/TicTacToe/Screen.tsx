// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { useContext } from 'react'
import { Cell } from '../board/Cell'
import { TicTacToe } from './Game'
import { GameBoardContainer, GameBoardHeader, GameBoardMain, MainContainer } from '../CustomStyled'
import { ActiveGameContext } from '../ActiveGame'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

export const TicTacToeView = (): JSX.Element => {
  const activeGameContext = useContext(ActiveGameContext)
  const game = pipe(
    activeGameContext.game,
    O.map((game_) => game_ as TicTacToe),
    O.getOrElseW(() => null),
  )
  if (game === null) return <></>

  return (
    <MainContainer>
      <GameBoardContainer>
        <GameBoardHeader>
          <h1>Tic Tac Toe</h1>
          <h2>It&apos;s {game.currentPlayer()}&apos;s turn</h2>
        </GameBoardHeader>
        <GameBoardMain>
          <Cell row={0} column={0} game={game} />
          <Cell row={0} column={1} game={game} />
          <Cell row={0} column={2} game={game} />
          <Cell row={1} column={0} game={game} />
          <Cell row={1} column={1} game={game} />
          <Cell row={1} column={2} game={game} />
          <Cell row={2} column={0} game={game} />
          <Cell row={2} column={1} game={game} />
          <Cell row={2} column={2} game={game} />
        </GameBoardMain>
      </GameBoardContainer>
    </MainContainer>
  )
}
