// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, LoginContainer, MainContainer, Select, Input } from './CustomStyled'
import { UserContext } from './User'

const Home = (): JSX.Element => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [roomId, setRoomId] = useState('')
    const [gameId, setGameId] = useState('')
    const user = useContext(UserContext)

    const redirectToRoom = (): void => {
        user.login(username)
        const roomUrl = `/${gameId}/${roomId}`
        console.log('Changing room to ' + roomUrl)
        history.push(roomUrl)
    }

    return (
        <MainContainer>
            <LoginContainer>
                <UserContext.Provider value={user}>
                    <form id="contact" action="" method="post">
                        <h1>playindoor.games</h1>
                        <h4>Create a game below</h4>
                        <Input
                            placeholder="User name"
                            type="text"
                            tabIndex={1}
                            required
                            autoFocus
                            onChange={(event): void => setUsername(event.target.value)}
                        />
                        <Input
                            placeholder="Room name"
                            type="text"
                            tabIndex={2}
                            required
                            onChange={(event): void => setRoomId(event.target.value)}
                        />
                        <Select onChange={(event): void => setGameId(event.target.value)}>
                            <option>Select a game</option>
                            <option value="tic-tac-toe">Tic Tic Toe</option>
                        </Select>
                        <Button name="submit" onClick={redirectToRoom}>
                            Create
                        </Button>
                        <p className="copyright">
                            Created by{' '}
                            <a href="https://tanayseven.com" target="_blank" rel="noreferrer">
                                Tanay PrabhuDesai
                            </a>
                        </p>
                    </form>
                </UserContext.Provider>
            </LoginContainer>
        </MainContainer>
    )
}

export default Home
