// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import { TicTacToeScreen } from './TicTacToe/Screen'
import { AdvancedTicTacToeScreen } from './AdvancedTicTacToe/Screen'
import { createGlobalStyle } from 'styled-components'

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

const App = (): JSX.Element => {
    return (
        <HashRouter>
            <GlobalStyle />
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/tic-tac-toe/:roomId">
                <TicTacToeScreen />
            </Route>
            <Route path="/advanced-tic-tac-toe/:roomId">
                <AdvancedTicTacToeScreen roomName={'sample-room'} />
            </Route>
            <Route path="/about">
                <About />
            </Route>
        </HashRouter>
    )
}
export default App
