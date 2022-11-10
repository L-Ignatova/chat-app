import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import io from "socket.io-client";
import { SEND_MESSAGE,
  RECEIVE_MESSAGE,
  USER_STARTED_TYPING,
  USER_STOPPED_TYPING,
  USER_IS_TYPING,
  USER_IS_NOT_TYPING } from './utils/constants';

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isUserTyping, setIsUserTyping] = useState(false);

  const scrollToChatBottom = () => {
    document.getElementById('chat-room').scrollTop = document.getElementById('chat-room').scrollHeight
  }

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
    socket.emit(SEND_MESSAGE, message);
    socket.emit(USER_STOPPED_TYPING);
    setMessage("");
  };

  useEffect(() => {
    socket.on(RECEIVE_MESSAGE, ({user, content}) => {
      setMessageList([...messageList, { user, content }]);
    });
    scrollToChatBottom();

    socket.on(USER_IS_TYPING, () => {
      setIsUserTyping(true);
      scrollToChatBottom();
    });
    socket.on(USER_IS_NOT_TYPING, () => {
      setIsUserTyping(false);
    });
  }, [socket, messageList]);

  return (
    <div className='App'>
      <div id="chat-room">
        {messageList.length ? messageList.map(msg => {
          return (
          <div className='msg'>
            <p className='username'>{`${msg.user}`}</p>
            <p className='msg-content'>{`${msg.content}`}</p>
          </div>);
        }) : null}
        <p className='user-typing'>
          {isUserTyping ? "User is typing..." : ""}
        </p> 
      </div>

      <div id='chat-controls'>
        <textarea placeholder='Message...' value={message} id='message-input' onChange={handleOnChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
