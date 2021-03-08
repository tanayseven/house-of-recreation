// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import { createContext } from 'react'

class LoggedInUser {
    readonly username: string
    constructor(username: string) {
        this.username = username
    }
}
class AnonymousUser {}
type User = LoggedInUser | AnonymousUser

export { AnonymousUser, LoggedInUser }
export type { User }
export const UserContext = createContext<User>(new AnonymousUser())
