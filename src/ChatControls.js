import React, { useState } from 'react';
import { 
  SEND_MESSAGE,
  USER_STARTED_TYPING,
  USER_STOPPED_TYPING 
} from './utils/constants';

const ChatControls = ({username, socket}) => {
  const [message, setMessage] = useState(""); 

  const handleOnChange = (ev) => {
    socket.emit(USER_STARTED_TYPING);
    setTimeout(() => {
      socket.emit(USER_STOPPED_TYPING);
    }, 2000);
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
      <textarea placeholder='Message...' value={message} id='message-input' onChange={handleOnChange} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatControls;
