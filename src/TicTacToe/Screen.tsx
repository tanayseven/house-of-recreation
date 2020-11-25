import React, { Component } from 'react'
import Communication from '../Communication'

export class TicTacToeScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount(): void {
        this.setState({ communication: new Communication(this.props.roomName, 'Lalu') })
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Tic Tac Toe</h1>
            </div>
        )
    }
}

interface State {
    communication: Communication
}

interface Props {
    roomName: string
}
