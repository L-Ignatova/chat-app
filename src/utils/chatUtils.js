export const scrollToChatBottom = () => {
  document.getElementById('chat-room').scrollTop = document.getElementById('chat-room').scrollHeight
};

export const randomNumber = () => Math.random()*100;