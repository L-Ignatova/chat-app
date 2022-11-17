import React, { useState } from 'react';
import './App.css';
import ChatControls from './components/ChatControls';
import ChatRoom from './components/ChatRoom';
import LanguageControls from './components/LanguageControls';
import LoginScreen from './components/LoginScreen';
import Logout from './components/Logout';
import { SocketContext, socket } from './context/socket';
import { UsernameContext } from './context/username';

const App = () => {
  const [contextUsername, setContextUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const setUsernameContext = (username) => {
    setContextUsername(username);
  };

  return (
    <SocketContext.Provider value={socket}>
      <UsernameContext.Provider value={contextUsername}>
        <div className='App'>
          <LanguageControls />
          {isLogged
          ? <>
              <ChatRoom />
              <ChatControls />
              <Logout />
            </>
          : <LoginScreen
              setIsLogged={setIsLogged}
              setUsernameContext={setUsernameContext}
            />}
        </div>
      </UsernameContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;