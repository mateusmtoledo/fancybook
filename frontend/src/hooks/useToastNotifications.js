import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function useToastNotifications() {
  const [notifications, setNotifications] = useState([]);
  function sendNotification({ type, text, duration = 5000 }) {
    const newNotification = {
      key: uuidv4(),
      type,
      text,
      duration: (duration / 1000).toString() + 's',
    };
    setTimeout(() => {
      setNotifications((prev) => (prev.filter((item) => item !== newNotification)));
    }, duration);
    setNotifications((previous) => [...previous, newNotification]);
  }

  return {
    notifications,
    sendNotification,
  };
}

export default useToastNotifications;
