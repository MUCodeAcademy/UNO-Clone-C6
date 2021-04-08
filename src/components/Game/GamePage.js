import { React, useEffect, useContext } from "react";
import useSocket from "../../hooks/useSocket.js";
import Chat from "./GameComponents/Chat";
import OtherPlayers from "./GameComponents/OtherPlayers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GameInfo from "./GameComponents/GameInfo.js";
import PlayerHand from "./GameComponents/PlayerHand.js";
import GameBoard from "./GameComponents/GameBoard.js";
import { GameContext } from "../../shared/GameContext";

const useStyles = makeStyles((theme) => ({
  gamePage: {
    width: "100%",
    height: "80vh",
    padding: 10,
    margin: "0px !important",
  },
  otherPlayers: {
    flexBasis: 125,
    margin: "8px auto",
    width: "calc(100% - 16px)",
  },
  info: {
    flexBasis: 125,
    width: "calc(100% - 18px)",
    textAlign: "center",
    margin: "8px auto",
  },
  chat: {
    flexBasis: 50,
    flexGrow: 1,
    width: "calc(100% - 18px)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    margin: "8px auto",
  },
  sectionContainer: {
    padding: "5px !important",
    display: "flex",
    flexDirection: "column",
  },
  gameBoard: {
    width: "calc(100% - 16px)",

    flexBasis: 100,
    flexGrow: 1,
    margin: "8px auto",
  },
  section: { border: "1px solid black", padding: 8, overflowY: "hidden" },

  playerHand: {
    flexBasis: 145,
    width: "calc(100% - 16px)",
    margin: "8px auto",
    overflowY: "scroll",
  },
}));

const GamePage = (props) => {
  const {
    isHostCon,
    gameActive,
    setGameActive,
    playerArray,
    setPlayerArray,
    drawDeck,
    discardDeck,
    userInfo,
    room,
    PlayerObject,
  } = useContext(GameContext);

  const {
    messages,
    gameData,
    sendPlayerData,
    sendMessage,
    joinRoom,
    sendJoinGame,
  } = useSocket(room, isHostCon); //placeholder for testing

  useEffect(() => {
    let newGuy = new PlayerObject(userInfo.username, userInfo.userID, []);
    sendJoinGame({ ...newGuy });
  }, []);

  useEffect(() => {
    joinRoom(userInfo.username, room);
  }, [room]);

  useEffect(() => {
    if (!gameActive || !isHostCon) return;
    if (gameActive && !isHostCon) setGameActive(true);
    sendPlayerData({ ...gameData, gameActive: true });
  }, [gameActive]);

  useEffect(() => {
    setPlayerArray([...gameData.players]);
  }, [gameData]);

  // useEffect(() => {
  //   if (isHostCon === true) {
  //     sendPlayerData({ ...gameData, gameActive: gameActive });
  //   } else {
  //     setGameActive(gameData.gameActive);
  //   }
  // }, [gameActive, sendPlayerData]);

  // useEffect(() => {
  //   if (
  //     isHostCon === true &&
  //     playerArray[1] &&
  //     playerArray[1].hand.length === 0 &&
  //     playerArray[0].hand.length > 0
  //   ) {
  //     setGameActive(false);
  //   }
  // });

  useEffect(() => {
    sendPlayerData({ ...gameData, drawDeck: [...drawDeck] });
  }, [drawDeck]);

  useEffect(() => {
    sendPlayerData({ ...gameData, discardDeck: [...discardDeck] });
  }, [discardDeck]);

  console.log(gameData);

  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.gamePage}>
      <Grid xs={3} item className={classes.sectionContainer}>
        <Grid className={`${classes.info} ${classes.section}`}>
          <GameInfo />
        </Grid>
        <Grid className={`${classes.chat} ${classes.section}`}>
          <Chat
            messages={messages}
            username={userInfo.username}
            sendMessage={sendMessage}
            joinRoom={joinRoom}
          ></Chat>
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.sectionContainer}>
        <Grid className={`${classes.otherPlayers} ${classes.section}`}>
          <OtherPlayers />
        </Grid>
        <Grid className={`${classes.gameBoard} ${classes.section}`}>
          <GameBoard>
            <button
              onClick={() => {
                console.log(playerArray);
                console.log(gameData.players);
              }}
            >
              PlayerArray and GameData.players
            </button>
          </GameBoard>
        </Grid>
        <Grid className={`${classes.playerHand} ${classes.section}`}>
          <PlayerHand />
        </Grid>
      </Grid>
      {/* </div> */}
      {/* <div /> */}
      {/* </div> */}
    </Grid>
  );
};

export default GamePage;
