import React from "react";
import { useTranslation } from "react-i18next";
import { ChatRoom_UserIsTypingMsg } from "../utils/locales/translationKeys";

const UserTyping = ({ show }) => {
  const { t } = useTranslation();

  return (
    <p className='user-typing'>
      {show ? t(ChatRoom_UserIsTypingMsg) : ""}
    </p>
  );
};

export default UserTyping;