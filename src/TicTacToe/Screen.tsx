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

    render(): JSX.Element {
        return (
            <div>
                <h1>Tic Tac Toe</h1>
                <div className="board-row">
                    <Cell row={0} column={0} game={this.state.game} />
                    <Cell row={0} column={1} game={this.state.game} />
                    <Cell row={0} column={2} game={this.state.game} />
                </div>
                <div className="board-row">
                    <Cell row={1} column={0} game={this.state.game} />
                    <Cell row={1} column={1} game={this.state.game} />
                    <Cell row={1} column={2} game={this.state.game} />
                </div>
                <div className="board-row">
                    <Cell row={2} column={0} game={this.state.game} />
                    <Cell row={2} column={1} game={this.state.game} />
                    <Cell row={2} column={2} game={this.state.game} />
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
