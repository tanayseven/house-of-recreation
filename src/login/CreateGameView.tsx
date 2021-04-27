/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import React, { useState } from 'react'
import * as O from 'fp-ts/Option'
import CommunicationClient, { ConnectionStatus, CreateRoom } from '../communication/CommunicationClient'
import { pipe } from 'fp-ts/function'
import { Button, Input, LoginContainer, MainContainer, Select, CopyButton, Label } from '../CustomStyled'
import { LoginFooter, LoginHeader } from './Components'
import Loader from '../Loader'
import styled from 'styled-components'

const ShortContainer = styled.div`
  display: flex;
  align-items: center;
`

const RoomID = ({ id }: { id: string }): JSX.Element => {
  const roomIdRef = React.createRef<HTMLInputElement>()
  return (
    <ShortContainer>
      <Label width="70px">Room ID:</Label>
      <Input ref={roomIdRef} value={id} readOnly width="200px" />
      <CopyButton
        onClick={(): void => {
          roomIdRef.current?.select()
          document.execCommand('copy')
        }}
      />
    </ShortContainer>
  )
}

const CreateGameView = (): JSX.Element => {
  const [userName, setUserName] = useState('')
  const [gameId, setGameId] = useState('')
  const [communicationClient, setCommunicationClient] = useState<O.Option<CommunicationClient>>(O.none)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('offline')
    const redirectTo = (roomId: string): void => { //eslint-disable-line
    const roomUrl = `/${gameId}/${roomId}`
    console.log('Changing room to ' + roomUrl)
    // history.push(roomUrl)
  }
  const createRoom = (): void => {
    console.log('Creating room')
    setCommunicationClient(
      O.some(
        new CommunicationClient(userName, {
          connectionStatusHandler: connClientStateHandler,
          maxPeers: 2,
          game: 'tic-tac-toe',
        } as CreateRoom),
      ),
    )
    console.log('Room Created')
  }
  pipe(
    communicationClient,
    O.map((obj) => console.log(obj)),
  )
  const connClientStateHandler = (newConnClientStateHandler: ConnectionStatus): void => {
    setConnectionStatus(newConnClientStateHandler)
  }
    const roomId = pipe( //eslint-disable-line
    communicationClient,
    O.map((obj) => obj.roomId),
    O.getOrElse(() => ''),
  )
  return (
    <>
      <MainContainer>
        <LoginContainer>
          {connectionStatus === 'offline' && roomId !== '' ? (
            <Loader>
              <RoomID id={roomId} />
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
