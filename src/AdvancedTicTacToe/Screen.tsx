// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { Component } from 'react'
import CommunicationClient from '../CommunicationClient'

export class AdvancedTicTacToeScreen extends Component<Props, State> {
    componentDidMount(): void {
        this.setState({
            communication: new CommunicationClient(this.props.roomName, 'Lalu', 2, (userName, status) => {
                console.log(`${userName} just went ${status}`)
            }),
        })
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
    communication: CommunicationClient
}

interface Props {
    roomName: string
}
