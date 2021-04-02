import React, { useState, useEffect } from "react";
import deck from "./deck";

export const GameContext = React.createContext();

export function GameProvider({ children }) {
  const [isHost, setIsHost] = useState[false];
  const [canPlay, setCanPlay] = useState[false];
  const [playerArray, setPlayerArray] = useState[[]];
  const [gameActive, setGameActive] = useState[false];
  const [cards, setCards] = useState[deck];
  const [drawDeck, setDrawDeck] = useState[[]];
  const [discardDeck, setDiscardDeck] = useState[[]];
  const [userInfo, setUserInfo] = useState[{}];

  function createUserInfo(providedName) {
    let ID =
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 6);
    setUserInfo({ username: providedName, userID: ID });
  }

  function oneShuffle(toShuffle) {
    let pre = [...toShuffle];
    let post = [];
    for (let i = 0; i <= pre.length; i++) {
      post.splice(Math.floor(Math.random() * i), 0, pre[i]);
    }
    let almost = post.reverse();
    let pen = [];
    for (let i = 0; i <= almost.length; i++) {
      pen.splice(Math.floor(Math.random() * i), 0, almost[i]);
    }
    let ult = pen.filter((x) => x !== undefined);
    return ult;
  }

  function shuffleDeck(toBeShuffled) {
    let shuffled = oneShuffle(
      oneShuffle(
        oneShuffle(oneShuffle(oneShuffle(oneShuffle(oneShuffle(toBeShuffled)))))
      )
    );
    setCards(shuffled);
  }

  function deal(toBeDealt) {
    let shuffled = shuffleDeck([...cards]);
    for (let i = 0; i < playerArray.length; i++) {
      let newPlayerArray = [...playerArray];
      for (let j = 1; j <= 7; j++) {
        let dealtCard = shuffled.shift();
        newPlayerArray[i] = {
          ...newPlayerArray[i],
          hand: { ...newPlayerArray[i].hand, dealtCard },
        };
        setPlayerArray(...newPlayerArray);
      }
    }
    shuffled.forEach((card) => {
      draw.push(card);
    });
    shuffledDeck.splice(0);
    discard.push(draw.shift());
  }

  function startGame() {
    let gameCards = shuffleDeck();
    deal(gameCards);
  }

  function regularTurn() {
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
        regularTurn();
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

  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
}
