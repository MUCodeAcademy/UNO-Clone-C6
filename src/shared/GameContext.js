import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import deck from "./deck";
import { UserContext } from "../shared/UserContext";

export const GameContext = React.createContext();

export function GameProvider({ children }) {
  const [isHostCon, setIsHostCon] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [drawDeck, setDrawDeck] = useState([]);
  const [discardDeck, setDiscardDeck] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [room, setRoom] = useState("");
  const history = useHistory();
  const { loading } = useContext(UserContext);

  function PlayerObject(username, userID, hand) {
    this.username = username;
    this.userID = userID;
    this.hand = hand;
  }

  const createUserInfo = useCallback((providedName) => {
    let ID =
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 6);
    setUserInfo({ username: providedName, userID: ID });
  }, []);

  useEffect(() => {
    if (playerArray[0] && playerArray[0].userID === userInfo.userID) {
      setCanPlay(true);
    } else {
      setCanPlay(false);
      console.log("IT'S YOUR TURN");
    }
  }, [playerArray]);

  useEffect(() => {
    if (playerArray[1] && playerArray[1].hand === []) {
      setGameActive(false);
    }
  }, [playerArray]);

  const oneShuffle = useCallback((toShuffle) => {
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
  }, []);

  const shuffleDeck = useCallback((toBeShuffled) => {
    let shuffled = oneShuffle(
      oneShuffle(
        oneShuffle(oneShuffle(oneShuffle(oneShuffle(oneShuffle(toBeShuffled)))))
      )
    );
    return shuffled;
  }, []);

  function WildCard(value, color, points) {
    this.value = value;
    this.color = color;
    this.points = points;
  }

  const deal = useCallback(() => {
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
    discard.push(draw.shift());
    setDiscardDeck(discard);
    console.log(playerArray);
  }, []);

  const startGame = useCallback(() => {
    setGameActive(true);
    deal();
  }, []);

  const regularTurn = useCallback(() => {
    let players = [...playerArray];
    let justPlayed = players.shift();
    let newOrder = [...players, justPlayed];
    setPlayerArray(newOrder);
  }, []);

  const reverseCard = useCallback(() => {
    let currentOrder = [...playerArray];
    setPlayerArray(currentOrder.reverse());
  }, []);

  const skip = useCallback(() => {
    let players = [...playerArray];
    let skipper = players.shift();
    let skippee = players.shift();
    let newOrder = [...players, skipper, skippee];
    setPlayerArray(newOrder);
  }, []);

  const drawTwo = useCallback(() => {
    let drawing = [...drawDeck];
    let cards = [drawing.shift(), drawing.shift()];
    let newHand = [...playerArray[1].hand];
    newHand.push(cards);
    let players = [...playerArray];
    let player = new PlayerObject(
      playerArray[1].username,
      playerArray[1].userID,
      newHand
    );
    setPlayerArray([...players, player]);
  }, []);

  const drawFour = useCallback(() => {
    let drawing = [...drawDeck];
    let cards = [
      drawing.shift(),
      drawing.shift(),
      drawing.shift(),
      drawing.shift(),
    ];
    let newHand = [...playerArray[1].hand];
    newHand.push(cards);
    let players = [...playerArray];
    let player = new PlayerObject(
      playerArray[1].username,
      playerArray[1].userID,
      newHand
    );
    setPlayerArray([...players, player]);
    setDrawDeck(drawing);
  }, []);

  const setColor = useCallback((playedCard, newColor) => {
    let newCard = new WildCard(playedCard.value, newColor, playedCard.points);
    let discard = [...discardDeck];
    discard.shift();
    discard.unshift(newCard);
    setDiscardDeck(discard);
  }, []);

  const drawCard = useCallback((playerID) => {
    if (gameActive && canPlay) {
      let draw = [...drawDeck];
      let player = playerArray.filter((p) => p.userID === playerID);
      let card = draw.shift();
      console.log("Top card:", discardDeck[0]);
      console.log("Drawn card:", card);
      // let discard = [...discardDeck];
      setDrawDeck(draw);
      if (
        card.color === discardDeck[0].color ||
        card.value === discardDeck[0].value ||
        card.value.toString().includes("Wild")
      ) {
        console.log("Playing drawn card");
        playCard(card, discardDeck[0]);
      } else {
        let newHand = [...player[0].hand, card];
        let afterDraw = new PlayerObject(
          player[0].username,
          player[0].userID,
          newHand
        );
        let players = [...playerArray];
        players.shift();
        setPlayerArray([...players, afterDraw]);
      }
    } else {
      return;
    }
  }, []);

  const playCard = useCallback((playCard, topDiscard, wildToColor) => {
    if (gameActive && canPlay) {
      let discard = [...discardDeck];
      if (
        playCard.value === topDiscard.value ||
        playCard.color === topDiscard.color ||
        playCard.value.toString().includes("Wild")
      ) {
        discard.unshift(playCard);
        setDiscardDeck(discard);
        if (!isNaN(playCard.val) || playCard.value === "Draw Two") {
          drawTwo();
          regularTurn();
          return;
        }
        if (playCard.value.toString().includes("Wild")) {
          setColor(playCard, wildToColor);
          if (playCard.value.toString().includes("Four")) {
            drawFour();
            return;
          } else {
            regularTurn();
            return;
          }
        }
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
    return;
  }, []);

  const quitGame = useCallback((e) => {
    e.preventDefault();
    return history.push("/home");
  }, []);

  const value = {
    isHostCon,
    setIsHostCon,
    playerArray,
    setPlayerArray,
    gameActive,
    setGameActive,
    canPlay,
    setCanPlay,
    drawDeck,
    setDrawDeck,
    discardDeck,
    setDiscardDeck,
    userInfo,
    setUserInfo,
    room,
    setRoom,
    createUserInfo,
    deal,
    startGame,
    drawCard,
    playCard,
    quitGame,
  };

  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
}
