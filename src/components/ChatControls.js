import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/socket';
import {
  SEND_MESSAGE,
  USER_STARTED_TYPING,
  USER_STOPPED_TYPING
} from '../utils/constants';
import { ChatControls_SendButton, ChatControls_MessagePlaceholder } from "../utils/locales/translationKeys";
import { useTranslation } from 'react-i18next';
import { UsernameContext } from '../context/username';

const ChatControls = () => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const username = useContext(UsernameContext);
  const { t } = useTranslation();

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
      <textarea
        placeholder={t(ChatControls_MessagePlaceholder)}
        value={message}
        id='message-input'
        onChange={handleOnChange}
      />
      <button onClick={sendMessage}>{t(ChatControls_SendButton)}</button>
    </div>
  );
};

ChatControls.displayName = "ChatControls";
export default ChatControls;