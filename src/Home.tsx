import React from 'react';
import { useHistory } from 'react-router-dom';


function Home() {
    const history = useHistory()
    function onRoomSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const roomUrl = `/${event.target.value}`
        console.log("Changing room to " + roomUrl)
        history.push(roomUrl)
    }

  return (
    <div>
      <h1>House of Recreation</h1>
      <div>
        <label htmlFor="room-type">Create a Room</label>
        <select name="room-types" id="room-type" onChange={onRoomSelect}>
          <option value="">Select an option</option>
          <option value="chat">Chat</option>
          <option value="pictionary">Pictionary</option>
        </select>
      </div>
    </div>
  );
}

export default Home;