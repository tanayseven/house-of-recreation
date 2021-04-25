// Copyright (C) 2021  Tanay PrabhuDesai
// Please refer to LICENSE.txt file for a complete copyright notice

import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import About from './About'
import { TicTacToeView } from './TicTacToe/Screen'
import { createGlobalStyle } from 'styled-components'
import Home from './login/Home'
import CreateGameView from './login/CreateGameView'
import JoinGameView from './login/JoinGameView'

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
                <TicTacToeView />
            </Route>
            <Route path="/create-game">
                <CreateGameView />
            </Route>
            <Route path="/join-game">
                <JoinGameView />
            </Route>
            <Route path="/about">
                <About />
            </Route>
        </HashRouter>
    )
}
export default App
