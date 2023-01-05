import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css';
import Chat from './components/Chat';
import LanguageControls from './components/LanguageControls';
import LoginScreen from './components/LoginScreen';
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
          <Routes>
            <Route path='/' element={<LoginScreen
              setIsLogged={setIsLogged}
              setUsernameContext={setUsernameContext}
            />}></Route>
            <Route path='/chat' element={<Chat isLogged={isLogged}/>}></Route>
          </Routes>
        </div>
      </UsernameContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
