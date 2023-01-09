import React, { useContext, useState } from 'react';
import "../utils/locales/config"
import {useTranslation} from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChatControls_LoginButton, ChatControls_UsernamePlaceholder } from "../utils/locales/translationKeys";
import { SocketContext } from '../context/socket';
import { USER_HAS_JOINED } from '../utils/constants';
import UsernameErrorMsg from './UsernameError';
import { isLongerThan } from '../utils/chatUtils';

const LoginScreen = ({ setIsLogged, setUsernameContext }) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!isLongerThan(username)) {
      setUsernameError(true);
      return;
    }
    setUsernameContext(username);
    setIsLogged(true);
    navigate("/chat");
    socket.emit(USER_HAS_JOINED, username);
  };

  const onInputChange = (ev) => {
    setUsername(ev.target.value);
    if (usernameError && isLongerThan(ev.target.value)) {
      setUsernameError(false);
    };
  };
 
  return (
    <div className='login-screen'>
      <input
        className='input-username'
        placeholder={t(ChatControls_UsernamePlaceholder)}
        value={username}
        onChange={onInputChange}
      />
      {usernameError && <UsernameErrorMsg />}
      <button onClick={handleLogin}>{t(ChatControls_LoginButton)}</button>
    </div>
  );
}

export default LoginScreen;
