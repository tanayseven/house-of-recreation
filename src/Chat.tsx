import React, { Component, KeyboardEvent } from 'react';

class Chat extends Component<{}, ChatState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            chatMessages: ["--- Start of chat ---"],
        }
        this.keyPressedInChatInput = this.keyPressedInChatInput.bind(this)
    }
    keyPressedInChatInput(event: KeyboardEvent<HTMLInputElement>) {
        const element = event.target as HTMLInputElement 
        if (event.key === "Enter") {
            this.state.chatMessages.push(element.value)
            console.log(element.value)
            this.setState({chatMessages: this.state.chatMessages})
            element.value = ""
        }
    }
    render() {
        const chatMessagesList = this.state.chatMessages.map((chatMessage, index)=><li key={index}>{chatMessage}</li>)
  return (
    <div>
      <h1>House of Recreation</h1>
      <div>
          <p>Chat</p>
          <div style={{height: "300px", border: "1px solid black"}}>
            <ul>
                {chatMessagesList}
            </ul>
          </div>
          <input type="text" id="chat-send" onKeyPress={this.keyPressedInChatInput} />
      </div>
    </div>
  );

    }
}

interface ChatState {
    chatMessages: string[]
}

export default Chat;
