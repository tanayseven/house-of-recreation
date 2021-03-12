// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { useContext, useEffect, useState } from 'react'
import Communication from '../Communication'
import { Cell } from '../board/Cell'
import { TicTacToe } from './Game'
import { useParams } from 'react-router-dom'
import { GameBoardContainer, GameBoardHeader, GameBoardMain, MainContainer } from '../CustomStyled'
import { User, UserContext } from '../User'

type Params = {
    roomId: string
}

export const TicTacToeScreen = (): JSX.Element => {
    const [game, setGame] = useState<TicTacToe>()
    const { roomId } = useParams<Params>()
    const user = useContext<User>(UserContext)
    console.log(`-------------------> ${user.username}`)
    const [communication, setCommunication] = useState<Communication>(new Communication(roomId, user.username))

    useEffect(() => {
        console.log('some action happened')
    }, [communication])

    if (typeof game === 'undefined') return <p>Loading...</p>

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
