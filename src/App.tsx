import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Home';
import Codewords from './Codewords';
import Pictionary from './Pictionary';
import About from './About';

function App(): JSX.Element {
    return (
        <HashRouter>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/codewords">
                <Codewords roomName="this-is-some-random-room-abcdefgh" />
            </Route>
            <Route path="/pictionary">
                <Pictionary />
            </Route>
            <Route path="/about">
                <About />
            </Route>
        </HashRouter>
    );
}

export default App;
