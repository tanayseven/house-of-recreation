// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

const Bugout = require('bugout') // eslint-disable-line

const BASE_IDENTIFIER = 'com.house-of-rec.rooms.'

export default class Communication {
    bugout: any //eslint-disable-line
    peers: Array<any> = [] //eslint-disable-line
    roomName: string //eslint-disable-line

    constructor(roomName: string, selfName: string) {
        this.bugout = Bugout(`${BASE_IDENTIFIER}${roomName}`)
        this.roomName = roomName
        this.bugout.on('message', function (address: any, message: any) { //eslint-disable-line
            console.log(`Message from ${address} is ${JSON.parse(message)}`)
        })
        this.bugout.on('seen', function (address: any) { //eslint-disable-line
            console.log(`Just seen this address ${address} join`)
        })
        this.bugout.send({ message: `Hi, It's ${selfName} I've just connected` })
    }
}
