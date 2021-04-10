// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import Bugout from 'bugout'

type Message = { //eslint-disable-line
    fromUser: string
    messageType: string
    content: string
}

const BASE_IDENTIFIER = 'games.playindoor.room.'

type Peer = {
    address: string
    userName: string
}

export default class Communication {
    bugout: Bugout
    peers: Map<string, Peer> = new Map()
    roomName: string
    readonly maxPeers: number
    constructor(roomName: string, selfName: string, maxPeers = 4) {
        this.maxPeers = maxPeers
        this.bugout = new Bugout(`${BASE_IDENTIFIER}${roomName}`, {
            announce: ['wss://playindoor-games-signalling.herokuapp.com/'],
        })
        console.log(`Created a server on ${BASE_IDENTIFIER}${roomName}`)
        this.roomName = roomName
        // TODO receive the name of the peer who announces themselves
        // TODO pass (via callback) the name back to the client holding the communication object
        this.bugout.on('message', (address: any, message: any) => { //eslint-disable-line
            // this.peers.set(address, { userName: message.from, address } as Peer)
            const messageObj = JSON.parse(message)
            // if (messageObj.from !== selfName) {
            console.log(`${messageObj.from} just sent a message: ${messageObj.message}`)
            // }
        })
        this.bugout.on('left', (address: any) => { //eslint-disable-line
            console.log(`${address} just left the chat`)
        })
        // TODO tell your name to all the peers
        // this.peers.forEach((value: any, key: any) =>
        //     this.bugout.send(
        //         key,
        //         JSON.stringify({
        //             message: `Hi, It's ${selfName} I've just connected`,
        //             messageType: 'joined',
        //             from: selfName,
        //         }),
        //     ),
        // )
        setInterval((): void => {
            console.log(`${selfName} sending a message`)
            this.bugout.send(
                JSON.stringify({ message: `Ping from ${selfName} :)`, messageType: 'generic', from: selfName }),
            )
        }, 1000)
    }
    disconnect(): void { //eslint-disable-line
        if (this.bugout !== null) this.bugout.destroy()
    }
}
