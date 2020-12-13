import React, { Component } from 'react'
import Communication from '../Communication'
import { Cell } from '../board/Cell'
import { TicTacToe } from './Game'

export class TicTacToeScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            game: new TicTacToe('Lalu', 'Kaku'),
        } as State
    }

    componentDidMount(): void {
        this.setState({
            communication: new Communication(this.props.roomName, 'Lalu'),
        })
    }

    play(row: number, column: number): void {
        this.state.game.play(row, column)
        this.setState({ game: this.state.game })
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <div className="board-row">
                    <Cell
                        symbol={this.state.game.get(0, 0)}
                        onClick={(): void => {
                            this.play(0, 0)
                        }}
                    />
                    <Cell
                        symbol={this.state.game.get(0, 1)}
                        onClick={(): void => {
                            this.play(0, 1)
                        }}
                    />
                    <Cell
                        symbol={this.state.game.get(0, 2)}
                        onClick={(): void => {
                            this.play(0, 2)
                        }}
                    />
                </div>
                <div className="board-row">
                    <Cell
                        symbol={this.state.game.get(1, 0)}
                        onClick={(): void => {
                            this.play(1, 0)
                        }}
                    />
                    <Cell
                        symbol={this.state.game.get(1, 1)}
                        onClick={(): void => {
                            this.play(1, 1)
                        }}
                    />
                    <Cell
                        symbol={this.state.game.get(1, 2)}
                        onClick={(): void => {
                            this.play(1, 2)
                        }}
                    />
                </div>
                <div className="board-row">
                    <Cell
                        symbol={this.state.game.get(2, 0)}
                        onClick={(): void => {
                            this.play(2, 0)
                        }}
                    />
                    <Cell
                        symbol={this.state.game.get(2, 1)}
                        onClick={(): void => {
                            this.play(2, 1)
                        }}
                    />
                    <Cell
                        symbol={this.state.game.get(2, 2)}
                        onClick={(): void => {
                            this.play(2, 2)
                        }}
                    />
                </div>
            </div>
        )
    }
}

interface State {
    communication: Communication
    game: TicTacToe
}

interface Props {
    roomName: string
}
