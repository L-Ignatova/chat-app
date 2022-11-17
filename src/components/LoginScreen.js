import React, { useContext, useState } from 'react';
import "../utils/locales/config"
import {useTranslation} from "react-i18next";
import { ChatControls_LoginButton, ChatControls_UsernamePlaceholder } from "../utils/locales/translationKeys";
import { SocketContext } from '../context/socket';
import { USER_HAS_JOINED } from '../utils/constants';

const LoginScreen = ({ setIsLogged, setUsernameContext }) => {
  const [username, setUsername] = useState("");
  const { t } = useTranslation();
  const socket = useContext(SocketContext);

  const handleLogin = () => {
    setUsernameContext(username);
    setIsLogged(true);
    socket.emit(USER_HAS_JOINED, username);
  };
 
  return (
    <div className='login-screen'>
      <input
        className='input-username'
        placeholder={t(ChatControls_UsernamePlaceholder)}
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <button onClick={handleLogin}>{t(ChatControls_LoginButton)}</button>
    </div>
  );
}

export default LoginScreen;