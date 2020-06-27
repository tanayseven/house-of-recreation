import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function Home(): JSX.Element {
    const history = useHistory();

    function roomSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
        const roomUrl = `/${event.target.value}`;
        console.log('Changing room to ' + roomUrl);
        history.push(roomUrl);
    }

    return (
        <div>
            <h1>House of Recreation</h1>
            <div>
                <label htmlFor="room-type">Create a Room</label>
                <select name="room-types" id="room-type" onChange={roomSelect}>
                    <option value="">Select an option</option>
                    <option value="chat">Chat</option>
                    <option value="pictionary">Pictionary</option>
                </select>
                <p>
                    <Link to="/about">About</Link>
                </p>
            </div>
        </div>
    );
}

export default Home;
