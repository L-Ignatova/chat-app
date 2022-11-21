import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';
import {scrollToChatBottom, randomNumber} from "../utils/chatUtils";
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
      const [lastMessage] = messageList.slice(-1);
      const isSameAuthor = lastMessage?.author === author && author !== "system";
      const isSystemMessage = Array.isArray(message) && (message[1] === "Join" || message[1] === "Left");

      const updatedMessage = isSameAuthor
        ? [...lastMessage.messages, message]
        : isSystemMessage
          ? [`${message[0]} ${t(`ChatRoom_UserInChat_${message[1]}`)}`]
          : [message];
      const updatedMessageList = isSameAuthor
        ? messageList.slice(0, messageList.length-1)
        : messageList;
     
      setMessageList([...updatedMessageList, { author, messages: updatedMessage }])
    });
   
    socket.on(USER_IS_TYPING, () => {
      setIsUserTyping(true);
    });
    socket.on(USER_IS_NOT_TYPING, () => {
      setIsUserTyping(false);
    });

    scrollToChatBottom();

    //the listeners must be removed in the cleanup step, in order to prevent multiple event registrations
    return () => {
      socket.off(USER_IS_TYPING);
      socket.off(USER_IS_NOT_TYPING);
      socket.off(RECEIVE_MESSAGE);
    };
  }, [socket, messageList, isUserTyping]);
 
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