import React, { useState } from 'react'
import { Game } from './Game'

export const Cell: React.FC<Props> = (props: Props) => {
    const [game, setGame] = useState(props.game)
    return (
        <button
            className="square"
            onClick={(): void => {
                if (game.canPlay(props.row, props.column)) {
                    game.play(props.row, props.column)
                    setGame(Object.create(game))
                }
            }}
        >
            {game.get(props.row, props.column)}
        </button>
    )
}

interface Props {
    game: Game
    row: number
    column: number
}
