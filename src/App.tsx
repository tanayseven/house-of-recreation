// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React, { useState } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import { TicTacToeScreen } from './TicTacToe/Screen'
import { AdvancedTicTacToeScreen } from './AdvancedTicTacToe/Screen'
import { createGlobalStyle } from 'styled-components'
import { AnonymousUser, User, UserContext } from './User'

const GlobalStyle = createGlobalStyle`
    body, html {
        height: 100%;
        margin: 0;
    }
    #root {
        height: 100%;
        margin: 0;
        padding: 0;
    }
`

function App(): JSX.Element {
    const [userContext] = useState<User>(new AnonymousUser())
    return (
        <HashRouter>
            <GlobalStyle />
            <UserContext.Provider value={userContext}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/tic-tac-toe">
                    <TicTacToeScreen roomName={'sample-room'} />
                </Route>
                <Route path="/advanced-tic-tac-toe">
                    <AdvancedTicTacToeScreen roomName={'sample-room'} />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </UserContext.Provider>
        </HashRouter>
    )
}
export default App
