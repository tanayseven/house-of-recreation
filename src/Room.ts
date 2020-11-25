import { createContext } from 'react'
import { User } from './User'

export interface Room {
    getRoomName(): string
    getRoomType(): string
    addUser(user: User): void
}

export class Lobby implements Room {
    readonly roomName = 'Lobby'

    getRoomName(): string {
        return this.roomName
    }

    getRoomType(): string {
        return this.roomName
    }

    addUser(user: User): void {
        let _ = user; // eslint-disable-line
    }
}

export class CodewordsRoom implements Room {
    users: Array<User>
    roomName: string
    readonly roomType = 'Codewords'

    constructor(roomName: string) {
        this.users = []
        this.roomName = roomName
    }
    getRoomName(): string {
        return this.roomName
    }
    getRoomType(): string {
        return this.roomType
    }

    addUser(user: User): void {
        this.users.push(user)
    }
}

export const RoomContext = createContext<Room>(new Lobby())
