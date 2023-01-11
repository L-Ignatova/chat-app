export const scrollToChatBottom = () => {
  document.getElementById('chat-room').scrollTop = document.getElementById('chat-room').scrollHeight
};

export const randomNumber = () => Math.random()*100;

export const updateMessagesList = (prevList, currentMessageAuthor, currentMessage, t) => {
  const [lastMessage] = prevList.slice(-1);
  const isSameAuthor = lastMessage?.author === currentMessageAuthor && currentMessageAuthor !== "system";
  const isSystemMessage = Array.isArray(currentMessage) && (currentMessage[1] === "Join" || currentMessage[1] === "Left");

  let updatedMessage = isSameAuthor
    ? [...lastMessage.messages, currentMessage]
    : isSystemMessage
      ? [`${currentMessage[0]} ${t(`ChatRoom_UserInChat_${currentMessage[1]}`)}`]
      : [currentMessage];
  let updatedList = isSameAuthor
    ? prevList.slice(0, prevList.length-1)
    : prevList;
  return [updatedList, updatedMessage];
};

export const isLongerThan = (word) => word.length >= 4;
