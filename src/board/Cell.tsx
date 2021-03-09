// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { useState } from 'react'
import { Game } from './Game'
import { GameTile } from '../CustomStyled'

export const Cell: React.FC<Props> = (props: Props) => {
    const [game, setGame] = useState(props.game)
    return (
        <GameTile
            onClick={(): void => {
                if (game.canPlay(props.row, props.column)) {
                    game.play(props.row, props.column)
                    setGame(Object.create(game))
                }
            }}
        >
            {game.get(props.row, props.column)}
        </GameTile>
    )
}

type Props = {
    game: Game
    row: number
    column: number
}
