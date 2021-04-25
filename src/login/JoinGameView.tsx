/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import React, { useState } from 'react'
import CommunicationClient, { ConnectionStatus, JoinRoom } from '../communication/CommunicationClient'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Button, Input, LoginContainer, MainContainer } from '../CustomStyled'
import { LoginFooter, LoginHeader } from './Components'

const JoinGameView = (): JSX.Element => {
    const [roomId, setRoomId] = useState('')
    const [gameId, setGameId] = useState('')
    const [userName, setUserName] = useState('')
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('offline')
    const [communicationClient, setCommunicationClient] = useState<O.Option<CommunicationClient>>(O.none)
    const connClientStateHandler = (newConnClientStateHandler: ConnectionStatus): void => {
        setConnectionStatus(newConnClientStateHandler)
    }
    const redirectToRoom = (): void => {
        const roomUrl = `/${gameId}/${roomId}`
        console.log('Changing room to ' + roomUrl)
        // history.push(roomUrl)
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
    return (
        <>
            <MainContainer>
                <LoginContainer>
                    <LoginHeader />
                    <Input
                        placeholder="User name"
                        type="text"
                        tabIndex={1}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
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
