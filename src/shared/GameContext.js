import React, { useState, useEffect } from "react";
import deck from "./deck";

export const GameContext = React.createContext();

export function GameProvider({ children }) {
  const [isHost, setIsHost] = useState[false];
  const [canPlay, setCanPlay] = useState[true];
  const [playerArray, setPlayerArray] = useState[[]];
  const [gameActive, setGameActive] = useState[false];

  function numCard() {
    let players = [...playerArray]
    let justPlayed = players.shift();
    let newOrder = [...players, justPlayed];
    setPlayerArray(newOrder);
  }

  function reverse() {
    let currentOrder = [...playerArray];
    setPlayerArray(currentOrder.reverse());
  }

  function skip() {
    let players = [...playerArray];
    let skipper = players.shift();
    let skippee = players.shift();
    let newOrder = [...players, skipper, skippee];
    setPlayerArray(newOrder);
  }


  function drawCard(playerHand) {
    playerHand.push(draw.shift());
  }

  function playCard(player, playCard, topDiscard) {
    if (playCard.value === topDiscard.value || playCard.color === topDiscard.color) {
      topDiscard.push(playCard);
      if (!isNAN(playCard.val)) {
        numCard();
      }
      if (playCard.value === "Reverse") {
        reverse();
      }
      if (playCard.value === "Skip") {
        skip();
      }
    }
    if () {}
  }

  useEffect(() => {
      if (playerArray.length === 1) {
        setIsHost(true);
      };
      []
  })

  

  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
}
