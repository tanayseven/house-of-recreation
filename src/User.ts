import { createContext } from 'react'

export interface User {
    isLoggedIn(): boolean
    getUserName(): string
}

export class AnonymousUser implements User {
    isLoggedIn(): boolean {
        return false
    }
    getUserName(): string {
        return 'anonymous-user'
    }
}

export class LoggedInUser implements User {
    userName: string
    constructor(userName: string) {
        this.userName = userName
    }
    isLoggedIn(): boolean {
        return true
    }
    getUserName(): string {
        return this.userName
    }
}

export const UserContext = createContext<User>(new AnonymousUser())
