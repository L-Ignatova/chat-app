import React from "react";

const Notification = ({notificationMessage}) => {
  return (
    <div className="notification-message">
      {notificationMessage}
    </div>
  );
}

export default Notification;