import React, { useState, useEffect, useContext, useMemo } from "react";
import deck from "./deck";
import { UserContext } from "../shared/UserContext";

export const GameContext = React.createContext();

export function GameProvider({ children }) {
  const [isHostCon, setIsHostCon] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [drawDeck, setDrawDeck] = useState([]);
  const [discardDeck, setDiscardDeck] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [room, setRoom] = useState("");
  const { loading } = useContext(UserContext);
  const [hasWinner, setHasWinner] = useState(false);
  const [actionCount, setActionCount] = useState(0);

  function resetContext() {
    setIsHostCon(false);
    setPlayerArray([]);
    setGameActive(false);
    setDrawDeck([]);
    setDiscardDeck([]);
    setUserInfo({});
    setRoom("");
    setHasWinner(false);
  }
  const winner = useMemo(() => {
    if (!gameActive && !hasWinner) return null;
    setHasWinner(true);
    return playerArray.find((v) => v.hand.length === 0);
  }, [playerArray]);

  const canPlay = useMemo(() => {
    return playerArray[0] && playerArray[0].userID === userInfo.userID;
  }, [playerArray]);

  useEffect(() => {
    if (gameActive === true && drawDeck === []) {
      let move = shuffleDeck([...discardDeck]);
      setDrawDeck(move);
      setDiscardDeck([]);
    }
  });

  useEffect(() => {
    if (winner && !gameActive) {
      setActionCount(actionCount + 1);
      setGameActive(false);
    }
  }, [winner]);

  function PlayerObject(username, userID, hand) {
    this.username = username;
    this.userID = userID;
    this.hand = hand;
  }

  // function WildCard(value, color, points) {
  //   this.value = value;
  //   this.color = color;
  //   this.points = points;
  // }

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
    return shuffled;
  }

  function deal() {
    let shuffled = shuffleDeck(deck);
    let newPlayerArray = [...playerArray];
    for (let i = 0; i < newPlayerArray.length; i++) {
      for (let j = 1; j <= 7; j++) {
        let dealtCard = shuffled.shift();
        newPlayerArray[i].hand = [...newPlayerArray[i].hand, dealtCard];
      }
      setPlayerArray(newPlayerArray);
    }
    let draw = [...drawDeck];
    shuffled.forEach((card) => {
      draw.push(card);
    });
    shuffled.splice(0);
    setDrawDeck(draw);
    let discard = [...discardDeck];
    let firstCard = draw.shift();
    discard.push(firstCard);
    setDiscardDeck(discard);
    if (firstCard.value === "Draw Two") {
      let drawing = [...drawDeck];
      let cards = [drawing.shift(), drawing.shift()];
      setDrawDeck(drawing);
      let newHand = [...playerArray[0].hand, ...cards];
      let receiver = { ...playerArray[0], hand: newHand };
      let players = [...playerArray];
      players.shift();
      setPlayerArray([...players, receiver]);
      setActionCount(actionCount + 1);
    }
    if (firstCard.value.includes("Four")) {
      let drawing = [...drawDeck];
      let cards = [
        drawing.shift(),
        drawing.shift(),
        drawing.shift(),
        drawing.shift(),
      ];
      setDrawDeck(drawing);
      let newHand = [...playerArray[0].hand, ...cards];
      let receiver = { ...playerArray[0], hand: newHand };
      let players = [...playerArray];
      players.shift();
      setPlayerArray([...players, receiver]);
      setActionCount(actionCount + 1);
    }
    setActionCount(actionCount + 1);
  }

  function startGame() {
    deal();
    setGameActive(true);
  }

  function regularTurn() {
    let players = [...playerArray];
    let justPlayed = players.shift();
    let newOrder = [...players, justPlayed];
    setPlayerArray(newOrder);
    setActionCount(actionCount + 1);
  }

  function reverseCard() {
    let currentOrder = [...playerArray];
    setPlayerArray(currentOrder.reverse());
    setActionCount(actionCount + 1);
  }

  function skip() {
    let players = [...playerArray];
    let skipper = players.shift();
    let skippee = players.shift();
    let newOrder = [...players, skipper, skippee];
    setPlayerArray(newOrder);
    setActionCount(actionCount + 1);
  }

  function drawTwo() {
    let drawing = [...drawDeck];
    let cards = [drawing.shift(), drawing.shift()];
    setDrawDeck(drawing);
    let newHand = [...playerArray[1].hand, ...cards];
    let sender = playerArray[0];
    let receiver = { ...playerArray[1], hand: newHand };
    let players = [...playerArray];
    players.shift();
    players.shift();
    setPlayerArray([...players, sender, receiver]);
    setActionCount(actionCount + 1);
  }

  function drawFour() {
    let drawing = [...drawDeck];
    let cards = [
      drawing.shift(),
      drawing.shift(),
      drawing.shift(),
      drawing.shift(),
    ];
    setDrawDeck(drawing);
    let newHand = [...playerArray[1].hand, ...cards];
    let sender = playerArray[0];
    let receiver = { ...playerArray[1], hand: newHand };
    let players = [...playerArray];
    players.shift();
    players.shift();
    setPlayerArray([...players, sender, receiver]);
    setActionCount(actionCount + 1);
  }

  function setColor(/*playedCard,*/ newColor) {
    // let newCard = new WildCard(playedCard.value, newColor, playedCard.points);
    let newWild = { ...discardDeck[0], color: newColor };
    let discard = [...discardDeck];
    discard.splice(0, 1, newWild);
    setDiscardDeck(discard);
    if (newWild.value.includes("Draw Four")) {
      drawFour();
    } else {
      regularTurn();
    }
    setActionCount(actionCount + 1);
  }

  function drawCard(playerID) {
    if (gameActive && canPlay) {
      let draw = [...drawDeck];
      let player = playerArray.find((p) => p.userID === playerID);
      let card = draw.shift();
      // let discard = [...discardDeck];
      setDrawDeck(draw);
      if (
        card.color === discardDeck[0].color ||
        card.value === discardDeck[0].value ||
        card.value.toString().includes("Wild")
      ) {
        playCard(card, discardDeck[0]);
      } else {
        let newHand = [...player.hand, card];
        let afterDraw = { ...player, hand: newHand };
        let players = [...playerArray];
        players.shift();
        setPlayerArray([...players, afterDraw]);
      }
      setActionCount(actionCount + 1);
    } else {
      return;
    }
  }

  function playCard(playCard, topDiscard, idx = null) {
    if (winner) {
      return;
    }
    if (gameActive && canPlay) {
      let discard = [...discardDeck];
      if (
        playCard.value === topDiscard.value ||
        playCard.color === topDiscard.color ||
        playCard.value.toString().includes("Wild")
      ) {
        if (idx !== null) {
          let playerHand = [...playerArray[0].hand];
          playerHand.splice(idx, 1);
          let newPlayerArray = [...playerArray];
          newPlayerArray[0].hand = playerHand;
          setPlayerArray(newPlayerArray);
        }
        discard.unshift(playCard);
        setDiscardDeck(discard);
        if (playCard.value === "Draw Two") {
          drawTwo();
          return;
        }
        if (playCard.value.toString().includes("Wild")) {
          // setColor(playCard, wildToColor);
          // if (playCard.value.toString().includes("Four")) {
          //   drawFour();
          //   return;
          // } else {
          //   regularTurn();
          //   return;
          // }
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
        regularTurn();
        setActionCount(actionCount + 1);
      }
    }
    return;
  }

  const value = {
    isHostCon,
    setIsHostCon,
    playerArray,
    setPlayerArray,
    gameActive,
    setGameActive,
    canPlay,
    winner,
    actionCount,
    drawDeck,
    setDrawDeck,
    discardDeck,
    setDiscardDeck,
    userInfo,
    setUserInfo,
    room,
    setRoom,
    PlayerObject,
    createUserInfo,
    startGame,
    setColor,
    drawCard,
    playCard,
    resetContext,
  };

  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
}
