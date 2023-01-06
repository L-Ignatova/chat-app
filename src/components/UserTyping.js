import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { scrollToChatBottom } from "../utils/chatUtils";
import { ChatRoom_UserIsTypingMsg } from "../utils/locales/translationKeys";

const UserTyping = ({ show }) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    scrollToChatBottom();
  });

  return (
    <p className='user-typing'>
      {show ? t(ChatRoom_UserIsTypingMsg) : ""}
    </p>
  );
};

export default UserTyping;
