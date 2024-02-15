import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from "sweetalert2";

const OnlineStatusContext = createContext();

export const OnlineStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const onlineStatus = navigator.onLine;
      setIsOnline(onlineStatus);
      
      Swal.fire({
        title: onlineStatus ? "Back Online" : "Internet Disconnected",
        text: onlineStatus
          ? "Hurray! Your internet connection is back online."
          : "Oops! It looks like your internet connection is offline.",
        icon: onlineStatus ? "success" : "warning",
      });
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={isOnline}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = () => useContext(OnlineStatusContext);
