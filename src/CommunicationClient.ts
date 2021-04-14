// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import Bugout, { BugoutOpts, RPCCallback } from 'bugout'
import { setInterval } from 'timers'

type Message = { //eslint-disable-line
    fromUser: string
    messageType: string
    content: string
}

type Peer = {
    address: string
    userName: string
    ping: number
}

type PeerStatus = 'offline' | 'online'

export default class CommunicationClient {
    private bugout: Bugout
    private peers: Map<string, Peer> = new Map()
    private roomName: string
    private selfAddress: string
    readonly maxPeers: number
    private peerStatusHandler: (peerName: string, status: PeerStatus) => void
    private peersStatusCheck: NodeJS.Timeout
    readonly selfName: string
    constructor(
        roomName: string,
        selfName: string,
        maxPeers = 4,
        peerStatusHandler: (peerName: string, status: PeerStatus) => void,
    ) {
        this.maxPeers = maxPeers
        this.roomName = roomName
        this.peerStatusHandler = peerStatusHandler
        this.selfName = selfName
        this.bugout = new Bugout(`playindoor.games/${roomName}`, {
            announce: ['wss://playindoor-games-signalling.herokuapp.com/'],
        } as BugoutOpts)
        this.bugout.heartbeat(1000)
        this.selfAddress = this.bugout.address()
        this.peersStatusCheck = setInterval(() => {
            this.peers.forEach((peer) => {
                peer.ping -= 1
                if (peer.ping === 0) this.peerStatusHandler(peer.userName, 'offline')
            })
        }, 2000)
        this.bugout.on<SeenCallBack>('seen', (address) => {
            this.bugout.rpc(address, 'getUserName', [], (userName: string) => {
                this.peers.set(address, { userName, address, ping: 1 } as Peer)
            })
        })
        this.bugout.on<RPCCallback>('rpc', () => this.selfName)
        this.bugout.on<RPCResponseCallBack>('rpc', () => this.selfName)
        this.bugout.on<PingCallback>('ping', (address) => {
            console.log(`received a ping from ${address}`)
            if (address !== this.selfAddress && this.peers.has(address)) {
                const peer = this.peers.get(address)
                if (typeof peer === 'undefined') return
                if (peer.ping === 0) this.peerStatusHandler(peer.userName, 'online')
                peer.ping += 1
            }
        })
    }
    disconnect(): void { //eslint-disable-line
        if (this.bugout !== null) this.bugout.destroy()
        this.peersStatusCheck.unref()
    }
}
