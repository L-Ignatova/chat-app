import React, { useContext } from 'react';
import "../utils/locales/config"
import { SocketContext } from '../context/socket';
import { UsernameContext } from '../context/username';
import { USER_HAS_LEFT } from '../utils/constants';

const Logout = () => {
  const socket = useContext(SocketContext);
  const username = useContext(UsernameContext)

  const handleLogout = () => {
    socket.emit(USER_HAS_LEFT, username);
  };
 
  return (
    <div className='round-buttons'>
      <button className='logout-btn' onClick={handleLogout}>Leave</button>
    </div>
  );
};

export default Logout;
