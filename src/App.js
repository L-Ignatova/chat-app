import React, { useState } from 'react';
import './App.css';
import io from "socket.io-client";
import ChatControls from './ChatControls';
import ChatRoom from './ChatRoom';
import LoginScreen from './LoginScreen';

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className='App'>
      {isLogged ? <>
          <ChatRoom socket={socket}/>
          <ChatControls username={username} socket={socket}/>
        </> : <LoginScreen 
          setIsLogged={setIsLogged} 
          username={username} 
          setUsername={setUsername}
        />}
    </div>
  );
}

export default App;
