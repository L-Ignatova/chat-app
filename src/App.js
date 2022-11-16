import React, { useEffect, useState } from 'react';
import './App.css';
import ChatControls from './components/ChatControls';
import ChatRoom from './components/ChatRoom';
import LoginScreen from './components/LoginScreen';
import { SocketContext, socket } from './context/socket';
import { USER_HAS_JOINED, USER_HAS_LEFT } from './utils/constants';

import bgTranslation from "./utils/languages/bg.json"
import enTranslation from "./utils/languages/en.json"
const locale = {
  "en": enTranslation,
  "bg": bgTranslation,
};

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("en");
  const [activeLocale, setActiveLocale] = useState(locale.en);

  useEffect(() => {
    setActiveLocale(locale[language]);
  }, [language]);

  useEffect(() => {
    socket.emit(USER_HAS_JOINED, username);
  }, [isLogged]);

  const handleLogout = () => {
    socket.emit(USER_HAS_LEFT, username);
  };

  return (
    <SocketContext.Provider value={socket}>
      <div className='App'>
        <div className='languages-buttons'>
          <button onClick={() => setLanguage("bg")}>bg</button>
          <button onClick={() => setLanguage("en")}>en</button>
        </div>
        {isLogged ? <>
            <ChatRoom username={username} activeLocale={activeLocale}/>
            <ChatControls username={username} activeLocale={activeLocale}/>
            <button className='logout-btn' onClick={handleLogout}>X</button>
          </> : <LoginScreen
            setIsLogged={setIsLogged}
            username={username}
            setUsername={setUsername}
            activeLocale={activeLocale}
          />}
      </div>
    </SocketContext.Provider>
  );
}

export default App;