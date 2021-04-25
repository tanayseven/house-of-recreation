// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { useContext, useEffect, useState } from 'react'
import { Cell } from '../board/Cell'
import { TicTacToe } from './Game'
import { useParams } from 'react-router-dom'
import { GameBoardContainer, GameBoardHeader, GameBoardMain, MainContainer } from '../CustomStyled'
import { User, UserContext } from '../User'
import CommunicationClient from '../communication/CommunicationClient'

type Params = {
  roomId: string
}

export const TicTacToeView = (): JSX.Element => {
  const [game, setGame] = useState<TicTacToe>()
    const { roomId } = useParams<Params>() //eslint-disable-line
  const user = useContext<User>(UserContext)
    const [commClient, setCommClient] = useState<CommunicationClient>() //eslint-disable-line

  useEffect(() => {
    if (typeof commClient != 'undefined' && commClient.totalPeers() === 2) {
      setGame(new TicTacToe(user.username, 'someoeneElse'))
    }
  }, [commClient])

  if (typeof game === 'undefined' && typeof commClient !== 'undefined')
    return (
      <>
        <MainContainer>
          <p>Room link: {commClient.roomId}</p>
          <br />
          <p>Loading...</p>
        </MainContainer>
      </>
    )
  if (typeof game === 'undefined')
    return (
      <>
        <MainContainer>
          <p>Loading...</p>
        </MainContainer>
      </>
    )

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
