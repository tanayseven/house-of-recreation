/*
 * Copyright (c) 2021. Tanay PrabhuDesai
 * Please refer to LICENSE.txt file for a complete copyright notice
 *
 */

import Bugout, { BugoutOpts, SeenCallback } from 'bugout'
import { v4 as uuid4 } from 'uuid'
import * as O from 'fp-ts/Option'

export type Message = {  //eslint-disable-line
    fromUser: string
    messageType: string
    content: string
}

type Peer = {
    address: string
    userName: string
    ping: number
}

export type ConnectionStatus = 'offline' | 'online'

export type GameType = 'tic-tac-toe'

export type CreateRoom = {
    game: GameType
    maxPeers: number
    connectionStatusHandler: (peerName: string, status: ConnectionStatus) => void
}

const isCreateRoom = (obj: any): obj is CreateRoom => {
    return 'game' in obj
}

export type JoinRoom = {
    roomId: string
    connectionStatusHandler: (peerName: string, status: ConnectionStatus) => void
}

export default class CommunicationClient {
    private readonly bugout: Bugout
    private peers: Map<string, Peer> = new Map()
    readonly roomId: string
    readonly address: string
    private maxPeers: O.Option<number> = O.none
    readonly connectionStatusHandler: (peerName: string, status: ConnectionStatus) => void
    readonly selfName: string
    private game: O.Option<GameType> = O.none
    private serverAddress: O.Option<string> = O.none

    constructor(selfName: string, action: CreateRoom | JoinRoom) {
        this.selfName = selfName
        if (isCreateRoom(action)) {
            console.log('creating room')
            this.maxPeers = O.some(action.maxPeers)
            this.roomId = uuid4()
            this.game = O.some(action.game)
        } else {
            console.log('joining room')
            // if action is JoinRoom
            this.roomId = action.roomId
        }
        this.bugout = new Bugout(`playindoor.games/${this.roomId}`, {
            announce: ['wss://playindoor-games-signalling.herokuapp.com/'],
        } as BugoutOpts)
        this.bugout.register('i-am-the-server', (address: string): string => {
            this.serverAddress = O.some(address)
            console.log(`found the server to be ${JSON.stringify(this.serverAddress)}`)
            return this.selfName
        })
        this.bugout.on<SeenCallback>('seen', (address) => {
            if (isCreateRoom(action)) {
                this.bugout.rpc(address, 'i-am-the-server', [this.address], () => null)
                this.peers.set(address, { address: address, userName: '', ping: 0 } as Peer)
            }
        })
        this.connectionStatusHandler = action.connectionStatusHandler
        this.selfName = selfName
        this.address = this.bugout.address()
    }

    totalPeers(): number {
        return this.peers.size
    }

    disconnect(): void {
        if (this.bugout !== null) this.bugout.destroy()
    }
}
