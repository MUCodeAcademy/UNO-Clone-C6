import React, { useState, useEffect } from "react";
import deck from "./deck";

export const GameContext = React.createContext();

export function GameProvider({ children }) {
  const [isHost, setIsHost] = useState[false];
  const [canPlay, setCanPlay] = useState[true];
  const [playerArray, setPlayerArray] = useState[[]];
  const [gameActive, setGameActive] = useState[false];

  function shuffleDrawDeck(draw) {
    for (let i = 0; i < draw.length; i++) {
      let j = Math.floor(Math.random() * i);
      let temp = draw[i];
      draw[i] = draw[j];
      draw[j] = temp;
    }
  }

  function deal() {
    let shuffledDeck = shuffleDrawDeck(deck);
    for (let i = 0; i < playerArray.length; i++) {
      for (let j = 1; j <= 4; j++) {
        let dealt = shuffledDeck.shift();
        let dealee = playerArray[i];
        dealee.push(dealt);
      }
    }
    shuffledDeck.forEach((card) => {
      draw.push(card);
    });
    shuffledDeck.splice(0);
    discard.push(draw.shift());
  }

  function plyOver() {
    let players = [...playerArray];
    let justPlayed = players.shift();
    let newOrder = [...players, justPlayed];
    setPlayerArray(newOrder);
  }

  function reverseCard() {
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

  function playCard(playCard, topDiscard) {
    if (
      playCard.value === topDiscard.value ||
      playCard.color === topDiscard.color
    ) {
      topDiscard.push(playCard);
      if (!isNAN(playCard.val) || playCard.value === "Draw Two") {
        plyOver();
        return;
      }
      if (playCard.value === "Reverse") {
        reverseCard();
        return;
      }
      if (playCard.value === "Skip") {
        skip();
        return;
      }
    }
  }

  useEffect(() => {
    if (playerArray.length === 1) {
      setIsHost(true);
    }
    [];
  });

  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
}
