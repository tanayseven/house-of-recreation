// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import { createContext } from 'react'

type LoginState = 'anonymous' | 'authenticated'

export class User {
  username: string
  state: LoginState
  constructor(state: LoginState) {
    this.state = state
    this.username = '' // TODO replace this with an option monad
  }
  isLoggedIn = (): boolean => {
    return this.state === 'authenticated'
  }
  login = (username: string): void => {
    this.username = username
    this.state = 'authenticated'
  }
  logout = (): void => {
    this.username = '' // TODO replace this with an option monad
    this.state = 'anonymous'
  }
}

export const UserContext = createContext(new User('anonymous'))
