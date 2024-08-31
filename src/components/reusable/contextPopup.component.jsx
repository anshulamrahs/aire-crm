import React, { createContext, useState, useContext } from 'react';

// Create a context with a default value of false
const PopupContext = createContext(false);

// Create a provider component
export const PopupProvider = ({ children }) => {
  const [isPopup, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
  };

  return (
    <PopupContext.Provider value={{ isPopup, togglePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to use the PopupContext
export const usePopup = () => {
  return useContext(PopupContext);
};
