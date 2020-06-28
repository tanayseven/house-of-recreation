import React, { Component, KeyboardEvent } from 'react';
const P2PT = require('p2pt'); // eslint-disable-line

class Chat extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const announceURLs = [
            'wss://tracker.openwebtorrent.com',
            'wss://tracker.sloppyta.co:443/announce',
            'wss://tracker.novage.com.ua:443/announce',
            'wss://tracker.btorrent.xyz:443/announce',
        ];
        this.state = {
            chatMessages: ['--- Start of chat ---'],
            peers: {},
            p2pt: new P2PT(announceURLs, 'p2chat' + this.props.roomName),
        };
        this.keyPressedInChatInput = this.keyPressedInChatInput.bind(this);
    }
    keyPressedInChatInput(event: KeyboardEvent<HTMLInputElement>): void {
        const element = event.target as HTMLInputElement;
        if (event.key === 'Enter') {
            this.state.p2pt.send();
            this.state.chatMessages.push(element.value);
            console.log(element.value);
            this.setState({ chatMessages: this.state.chatMessages });
            element.value = '';
        }
    }
    render(): JSX.Element {
        const chatMessagesList = this.state.chatMessages.map((chatMessage, index) => (
            <li key={index}>{chatMessage}</li>
        ));
        return (
            <div>
                <h1>House of Recreation</h1>
                <div>
                    <p>Chat</p>
                    <div style={{ height: '300px', border: '1px solid black' }}>
                        <ul>{chatMessagesList}</ul>
                    </div>
                    <input type="text" id="chat-send" onKeyPress={this.keyPressedInChatInput} />
                </div>
            </div>
        );
    }
}

interface State {
    chatMessages: string[];
    peers: any;// eslint-disable-line
    p2pt: any;// eslint-disable-line
}

interface Props {
    roomName: string;
}

export default Chat;
