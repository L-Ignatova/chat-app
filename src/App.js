import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  // const [isUserTyping, setIsUserTyping] = useState(false);

  const handleOnChange = (ev) => {
    // socket.emit("user_started_typing");
    // setIsUserTyping(true);
    setMessage(ev.target.value);
  };

  const sendMessage = () => {
    // setIsUserTyping(false);
    socket.emit("send_message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", ({user, content}) => {
      console.log(content);
      setMessageList([...messageList, { user, content }]);
    });
    console.log(messageList)
    // socket.on("user_is_typing", (data) => {
    // setIsUserTyping(true);
    // });
  }, [socket, messageList]);

  return (
    <div className='App'>
      <div id="chat-room">
        {console.log(messageList.length)}
        {messageList.length ? messageList.map(msg => {
          return <p className='msg'>{`UserID ${msg.user}: ${msg.content}`}</p>;
        }) : null}
      </div>
      {/* {isUserTyping && <p>User is typing...</p>} */}
      <div id='chat-controls'>
        <input placeholder='Message...' value={message} id='message-input' onChange={handleOnChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
