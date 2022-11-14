import React from "react";

const UserTyping = ({ show, activeLocale }) => {
  return (
    <p className='user-typing'>
      {show ? activeLocale.userIsTypingMsg : ""}
    </p>
  );
};

export default UserTyping;
