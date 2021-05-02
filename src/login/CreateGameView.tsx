/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import React, { useContext, useState } from 'react'
import * as O from 'fp-ts/Option'
import CommunicationClient, { ConnectionStatus, CreateRoom } from '../communication/CommunicationClient'
import { pipe } from 'fp-ts/function'
import { Button, Input, LoginContainer, MainContainer, Select } from '../CustomStyled'
import { LoginFooter, LoginHeader } from './Components'
import Loader from '../Loader'
import { RoomId } from './RoomId'
import { ActiveGameContext } from '../ActiveGame'
import { TicTacToe } from '../TicTacToe/Game'

const CreateGameView = (): JSX.Element => {
  const [userName, setUserName] = useState('')
  const [gameId, setGameId] = useState('')
  const [communicationClient, setCommunicationClient] = useState<O.Option<CommunicationClient>>(O.none)
  const activeGameContext = useContext(ActiveGameContext)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('offline')
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
  const createRoom = (): void => {
    console.log('Creating room')
    setCommunicationClient(
      O.some(
        new CommunicationClient(userName, {
          connectionStatusHandler: connClientStateHandler,
          maxPeers: 2,
          game: gameId,
        } as CreateRoom),
      ),
    )
    console.log('Room Created')
  }
  pipe(
    communicationClient,
    O.map((obj) => console.log(obj)),
  )
  const connClientStateHandler = (connectionStatus_: ConnectionStatus): void => {
    console.log(`Connection state updated from ${connectionStatus} to ${connectionStatus_}`)
    setConnectionStatus(connectionStatus_)
  }
  const roomId = pipe(
    communicationClient,
    O.map((obj) => obj.roomId),
    O.getOrElse(() => ''),
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
          {connectionStatus === 'offline' && roomId !== '' ? (
            <Loader>
              <RoomId id={roomId} />
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
          <Select onChange={(event): void => setGameId(event.target.value)} tabIndex={2}>
            <option>Select a game</option>
            <option value="tic-tac-toe">Tic Tic Toe</option>
          </Select>
          <Button name="submit" onClick={createRoom}>
            Create Game
          </Button>
          <LoginFooter />
        </LoginContainer>
      </MainContainer>
    </>
  )
}

export default CreateGameView
