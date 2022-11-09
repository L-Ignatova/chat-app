import React from 'react';
import './App.css';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const sendMessage = () => {
    socket.emit("send_message", {
      message: "Hello"
    });
  };

  return (
    <div className='App'>
      <input placeholder='Message...' id='message-input' />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
}

export default App;
