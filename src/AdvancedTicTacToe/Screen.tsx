// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { Component } from 'react'
import Communication from '../Communication'

export class AdvancedTicTacToeScreen extends Component<Props, State> {
    componentDidMount(): void {
        this.setState({ communication: new Communication(this.props.roomName, 'Lalu') })
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Advanced Tic Tac Toe</h1>
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
