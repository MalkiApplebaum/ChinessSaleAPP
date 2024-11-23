// WinnersContext.js
//אפשר למחוק..

import React, { createContext, useState, useContext } from 'react';

const WinnersContext = createContext();

export const useWinners = () => {
  const context = useContext(WinnersContext);
  if (!context) {
    throw new Error('useWinners must be used within a WinnersProvider');
  }
  return context;
};

export const WinnersProvider = ({ children }) => {
  const [winners, setWinners] = useState([]);

  const addWinner = (winner) => {
    setWinners([...winners, winner]);
  };

  const removeWinner = (giftId) => {
    setWinners(winners.filter(winner => winner.giftId !== giftId));
  };

  const clearWinners = () => {
    setWinners([]);
  };

  return (
    <WinnersContext.Provider value={{ winners, addWinner, removeWinner, clearWinners }}>
      {children}
    </WinnersContext.Provider>
  );
};
