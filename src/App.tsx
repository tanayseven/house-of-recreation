import React, { Component, useContext, useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Home';
import Codewords from './Codewords';
import Pictionary from './Pictionary';
import About from './About';
import { UserContext, AnonymousUser, User } from './User';
import { Lobby, Room } from './Room';

function App(): JSX.Element {
    const [userContext] = useState<User>(new AnonymousUser());
    const [roomContext] = useState<Room>(new Lobby());
    return (
        <HashRouter>
            <UserContext.Provider value={userContext}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/codewords">
                    <Codewords roomName={roomContext} />
                </Route>
                <Route path="/pictionary">
                    <Pictionary />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </UserContext.Provider>
        </HashRouter>
    );
}

interface State {
    userName: string;
    roomName: string;
}

export default App;
