import React, { useState, useEffect } from "react";
import deck from "./deck";

export const GameContext = React.createContext();

export function GameProvider({ children }) {
  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
}
