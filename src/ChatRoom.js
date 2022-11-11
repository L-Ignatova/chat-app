import React, { useEffect, useState } from 'react';
import scrollToChatBottom from "./utils/chatUtils";
import { USER_IS_TYPING, USER_IS_NOT_TYPING, RECEIVE_MESSAGE } from './utils/constants';

const ChatRoom = ({socket}) => {
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const generateRandomNumber = () => Math.random()*100;

  useEffect(() => {
    socket.on(RECEIVE_MESSAGE, ({author, message}) => {
      setMessageList([...messageList, { author, message }]);
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
    <div id="chat-room">
      {messageList.length ? messageList.map(msg => {
        return (
        <div className='msg' key={generateRandomNumber()}>
          <p className='username'>{`${msg.author}`}</p>
          <p className='msg-content'>{`${msg.message}`}</p>
        </div>);
      }) : null}
      <p className='user-typing'>
        {isUserTyping ? "User is typing..." : ""}
      </p> 
    </div>
  );
};

export default ChatRoom;