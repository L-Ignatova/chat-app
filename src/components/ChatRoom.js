import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';
import {scrollToChatBottom, randomNumber, updateMessagesList} from "../utils/chatUtils";
import { USER_IS_TYPING, USER_IS_NOT_TYPING, RECEIVE_MESSAGE } from '../utils/constants';
import ChatRoomMessage from './ChatRoomMessage';
import Notification from './Notification';
import UserTyping from './UserTyping';
import { useTranslation } from 'react-i18next';
import { ChatRoom_NoMessages } from "../utils/locales/translationKeys";
import { UsernameContext } from '../context/username';

const ChatRoom = () => {
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const username = useContext(UsernameContext)
  const socket = useContext(SocketContext);
  const { t } = useTranslation();

  const authoredMessageList = messageList.filter(({author}) => author !== "system");

  useEffect(() => {
    socket.on(RECEIVE_MESSAGE, ({author, message}) => {
      setMessageList(prevList => {
        const [updatedList, updatedMessage] = updateMessagesList(prevList, author, message, t);
        
        return [...updatedList, { author, messages: updatedMessage }];
      });
      scrollToChatBottom();
    });
   
    
    //the listeners must be removed in the cleanup step, in order to prevent multiple event registrations
    return () => {
      socket.off(RECEIVE_MESSAGE);
    };
  }, []);
  
  useEffect(() => {
    socket.on(USER_IS_TYPING, () => {
      setIsUserTyping(true);
    });
    socket.on(USER_IS_NOT_TYPING, () => {
      setIsUserTyping(false);
    });
  
    scrollToChatBottom();
    
    return () => {
      socket.off(USER_IS_TYPING);
      socket.off(USER_IS_NOT_TYPING);
    }
  }, []);
 
  return (
    <div id="chat-room">
      <div className="chat-room-messages">
        {!!messageList.length && messageList.map(msg => {
            return (
              <ChatRoomMessage
                key={randomNumber()}
                msg={msg}
                username={username}
              />)
        })}
        {!authoredMessageList.length && <Notification
          notificationMessage={t(ChatRoom_NoMessages)}
        />}
      </div>
      <div className="chat-room-lower-notifications">
        <div>
          <button>{">>"}</button>
        </div>
        <UserTyping show={isUserTyping}/>
      </div>
    </div>
  );
};

export default ChatRoom;