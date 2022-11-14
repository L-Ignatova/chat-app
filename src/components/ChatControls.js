import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/socket';
import {
  SEND_MESSAGE,
  USER_STARTED_TYPING,
  USER_STOPPED_TYPING
} from '../utils/constants';

const ChatControls = ({ username, activeLocale }) => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);

  const handleOnChange = (ev) => {
    socket.emit(USER_STARTED_TYPING);
    setTimeout(() => {
      socket.emit(USER_STOPPED_TYPING);
    }, 1000);
    setMessage(ev.target.value);
  };

  const sendMessage = () => {
    if (!message.length) {
      return;
    }
    const messageContent = {author: username, message};

    socket.emit(SEND_MESSAGE, messageContent);
    socket.emit(USER_STOPPED_TYPING);
    setMessage("");
  };

  return (
    <div id='chat-controls'>
      <textarea placeholder={activeLocale.messageOoo} value={message} id='message-input' onChange={handleOnChange} />
      <button onClick={sendMessage}>{activeLocale.send}</button>
    </div>
  );
};

export default ChatControls;