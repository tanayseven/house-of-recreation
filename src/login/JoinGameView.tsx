/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import React, { useContext, useState } from 'react'
import CommunicationClient, { ConnectionStatus, JoinRoom } from '../communication/CommunicationClient'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Button, Input, LoginContainer, MainContainer } from '../CustomStyled'
import { LoginFooter, LoginHeader } from './Components'
import Loader from '../Loader'
import { ActiveGameContext } from '../ActiveGame'
import { TicTacToe } from '../TicTacToe/Game'

const JoinGameView = (): JSX.Element => {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('offline') //eslint-disable-line
  const activeGameContext = useContext(ActiveGameContext)
  const [communicationClient, setCommunicationClient] = useState<O.Option<CommunicationClient>>(O.none)
  const connClientStateHandler = (newConnClientStateHandler: ConnectionStatus): void => {
    setConnectionStatus(newConnClientStateHandler)
  }
  const redirectToRoom = (): void => {
    pipe(
      activeGameContext.communicationClient,
      O.map((communicationClient_) => {
        pipe(
          communicationClient_.getGameType(),
          O.map((gameType) => {
            const redirectUrl = `/${gameType}/${communicationClient_.roomId}`
            console.log(`Redirecting to ${redirectUrl}`)
          }),
        )
      }),
    )
  }
  const joinRoom = (): void => {
    console.log('Joining Room')
    setCommunicationClient(
      O.some(
        new CommunicationClient(userName, {
          connectionStatusHandler: connClientStateHandler,
          roomId: roomId,
        } as JoinRoom),
      ),
    )
    console.log('Room Joined')
  }
  pipe(
    communicationClient,
    O.map((obj) => console.log(obj)),
  )
  if (connectionStatus === 'online') {
    pipe(
      communicationClient,
      O.map((communicationClient_) => {
        activeGameContext.setActiveGame(communicationClient_, new TicTacToe())
        redirectToRoom()
      }),
    )
  }
  return (
    <>
      <MainContainer>
        <LoginContainer>
          {O.isSome(communicationClient) ? (
            <Loader>
              <p>Waiting for the game to start</p>
            </Loader>
          ) : (
            <></>
          )}
          <LoginHeader />
          <Input
            placeholder="User name"
            type="text"
            tabIndex={1}
            onChange={(event): void => {
              setUserName(event.target.value)
            }}
          />
          <Input
            placeholder="Room ID"
            type="text"
            tabIndex={2}
            onChange={(event): void => {
              setRoomId(event.target.value)
            }}
          />
          <Button name="submit" onClick={joinRoom}>
            Join Game
          </Button>
          <LoginFooter />
        </LoginContainer>
      </MainContainer>
    </>
  )
}

export default JoinGameView
