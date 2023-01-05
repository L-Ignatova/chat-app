import React from 'react';
import ChatRoom from "./ChatRoom";
import ChatControls from "./ChatControls";
import Logout from "./Logout";
import { Navigate } from "react-router-dom";

const Chat = ({isLogged}) => {
  if (!isLogged) {
    return <Navigate to="/" />;
  }
  
  return (
    <>
      <ChatRoom />
      <ChatControls />
      <Logout />
    </>
  );
}

export default Chat;
