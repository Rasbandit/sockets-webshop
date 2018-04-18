import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ['hello', 'hi there'],
      newMessage: '',
    };

    socket.on('generate response', data => {
      const messages = [...this.state.messages, data];
      this.setState({ messages });
    });
  }

  sendMessage(message, type) {
    console.log('message', message);
    socket.emit(`${type} message`, message);
  }

  handleChange(newMessage) {
    this.setState({ newMessage });
  }

  render() {
    const messages = this.state.messages.map(e => <p>{e}</p>);
    return (
      <div className="App">
        <div>
          <label>New Message</label>
          <input
            type="text"
            value={this.state.newMessage}
            onChange={e => {
              this.handleChange(e.target.value);
            }}
          />
          <button
            onClick={() => {
              this.sendMessage(this.state.newMessage, 'emit');
            }}
          >
            Emit
          </button>
          <button
            onClick={() => {
              this.sendMessage(this.state.newMessage, 'blast');
            }}
          >
            blast
          </button>
        </div>
        {messages}
      </div>
    );
  }
}

export default App;
