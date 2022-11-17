import React from 'react';
import { randomNumber } from '../utils/chatUtils';
import Notification from './Notification';
import { ChatRoom_AuthorYou } from "../utils/locales/translationKeys";
import { useTranslation } from 'react-i18next';

const ChatRoomMessage = ({msg, username}) => {
  const {t} = useTranslation();
  const isYourMsg = msg.author === username ? "your-msg" : "";
  const author = isYourMsg ? t(ChatRoom_AuthorYou) : msg.author;
 
  const isSystemNotification = msg.author === 'system';

  return isSystemNotification
      ? <Notification notificationMessage={msg.messages[0]} />
      : <div className={`msg ${isYourMsg}`}>
          <p className='username'>{author}</p>
          {msg.messages.map(m => <p
            key={randomNumber()}
            className='msg-content'>
              {`${m}`}
            </p>)
          }
        </div>;
};

export default ChatRoomMessage;