import React, { useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Home';
import Codenames from './Codewords';
import Pictionary from './Pictionary';
import About from './About';
import { AnonymousUser, User, UserContext } from './User';

function App(): JSX.Element {
    const [userContext] = useState<User>(new AnonymousUser());
    return (
        <HashRouter>
            <UserContext.Provider value={userContext}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/codenames">
                    <Codenames roomName={'sample-room'} />
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
