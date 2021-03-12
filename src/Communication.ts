// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

const Bugout = require('bugout') // eslint-disable-line

const BASE_IDENTIFIER = 'games.playindoor.room.'

export default class Communication {
    bugout: any //eslint-disable-line
    peers: Map<any, any> = new Map() //eslint-disable-line
    roomName: string //eslint-disable-line
    readonly maxPeers: number

    constructor(roomName: string, selfName: string, maxPeers = 4) {
        this.maxPeers = maxPeers
        this.bugout = new Bugout(`${BASE_IDENTIFIER}${roomName}`, {
            // TODO Add the following trackers to a config file and read them from there
            // TODO host the custom bittorrent-tracker onto a personal server
            announce: [
                'wss://hub.bugout.link',
                'wss://tracker.openwebtorrent.com',
                'wss://tracker.btorrent.xyz',
                'wss://tracker.openwebtorrent.com',
                'wss://tracker.sloppyta.co:443/announce',
                'wss://tracker.novage.com.ua:443/announce',
                'wss://tracker.btorrent.xyz:443/announce',
            ],
        })
        console.log(`Created a server on ${BASE_IDENTIFIER}${roomName}`)
        this.roomName = roomName
        // TODO receive the name of the peer who announces themselves
        // TODO pass (via callback) the name back to the client holding the communication object
        this.bugout.on('message', (address: any, message: any) => { //eslint-disable-line
            this.peers.set(address, { userName: message.from })
            const messageObj = JSON.parse(message)
            if (messageObj.from !== selfName) {
                console.log(`${messageObj.from} just sent a message: ${messageObj.message}`)
            }
        })
        this.bugout.on('left', (address: any) => { //eslint-disable-line
            console.log(`${address} just left the chat`)
        })
        // TODO tell your name to all the peers
        this.peers.forEach((value: any, key: any) =>
            this.bugout.send(
                key,
                JSON.stringify({
                    message: `Hi, It's ${selfName} I've just connected`,
                    messageType: 'joined',
                    from: selfName,
                }),
            ),
        )
        setInterval((): void => {
            console.log(`${selfName} sending a message`)
            this.bugout.send(
                JSON.stringify({ message: `Ping from ${selfName} :)`, messageType: 'generic', from: selfName }),
            )
        }, 1000)
    }
}
