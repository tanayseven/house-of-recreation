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
            p2pt: new P2PT(announceURLs, 'wow!-whaat?' + this.props.roomName),
        };
        this.keyPressedInChatInput = this.keyPressedInChatInput.bind(this);
        this.state.p2pt.on('peerconnect', (peer: any) => {// eslint-disable-line
            const peers = { ...this.state.peers };
            peers[peer.id] = peer;
            this.state.chatMessages.push('Peer connected ' + JSON.stringify(peer.id));
            this.setState({ peers: peers, chatMessages: this.state.chatMessages });
            console.log(JSON.stringify(this.state.peers));
        });
        this.state.p2pt.on('msg', (peer: any, msg: any) => {// eslint-disable-line
            const msgParsed = JSON.parse(msg);
            this.state.chatMessages.push(`Received: ${JSON.stringify(msgParsed)}`);
            this.setState({ chatMessages: this.state.chatMessages });
        });
        this.state.p2pt.on('peerclose', (peer: any) => {// eslint-disable-line
            const peers = { ...this.state.peers };
            delete peers[peer.id];
            const chatMessages = this.state.chatMessages;
            chatMessages.push(`peer ${JSON.stringify(peer.id)} left`);
            this.setState({ peers: peers, chatMessages: chatMessages });
        });
    }
    componentDidMount(): void {
        this.state.p2pt.start();
    }
    keyPressedInChatInput(event: KeyboardEvent<HTMLInputElement>): void {
        const element = event.target as HTMLInputElement;
        if (event.key === 'Enter' && element.value !== '') {
            for (const key in this.state.peers) {
                this.state.p2pt.send(this.state.peers[key], JSON.stringify({ msg: element.value }));
            }
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
                <p>Users online: {Object.keys(this.state.peers).map((key, _) => `${key}, `)}</p>
                <div>
                    <p>Chat</p>
                    <div style={{ minHeight: '300px', border: '1px solid black' }}>
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
