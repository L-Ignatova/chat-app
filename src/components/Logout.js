import React, { useContext } from 'react';
import "../utils/locales/config"
import { SocketContext } from '../context/socket';
import { UsernameContext } from '../context/username';
import { USER_HAS_LEFT } from '../utils/constants';
import { useTranslation } from 'react-i18next';
import { ChatControls_LeaveChat } from '../utils/locales/translationKeys';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const socket = useContext(SocketContext);
  const username = useContext(UsernameContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    socket.emit(USER_HAS_LEFT, username);
    navigate("/");
  };
 
  return (
    <div>
      <button className='logout-btn' onClick={handleLogout}>{t(ChatControls_LeaveChat)}</button>
    </div>
  );
};

export default Logout;
