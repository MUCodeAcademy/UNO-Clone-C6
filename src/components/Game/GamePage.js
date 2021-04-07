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
    setIsHostSoc,
    setGameData,
    sendPlayerData,
    sendMessage,
    joinRoom,
  } = useSocket(userInfo.username, userInfo.userID, room); //placeholder for testing

  console.log(playerArray);
  console.log(gameData);

  useEffect(() => {
    let newGuy = new PlayerObject(userInfo.username, userInfo.userID, []);
    let newPlayerArray = [...playerArray, newGuy];
    setGameData({ ...gameData, players: newPlayerArray });
  }, [userInfo, setGameData]);

  useEffect(() => {
    joinRoom(userInfo.username, room);
  }, [room]);

  useEffect(() => {
    if (isHostCon === true) {
      setIsHostSoc(true);
    }
  }, [isHostCon, setIsHostSoc]);

  useEffect(() => {
    setPlayerArray([...gameData.players]);
  }, [gameData.players, setPlayerArray]);

  useEffect(() => {
    sendPlayerData({
      ...gameData,
      players: [...gameData.players],
    });
  }, [gameData, playerArray, sendPlayerData]);

  useEffect(() => {
    sendPlayerData({
      ...gameData,
      players: [...gameData.players],
    });
  }, [playerArray, gameData, sendPlayerData]);

  useEffect(() => {
    sendPlayerData({ ...gameData, players: [...playerArray] });
  }, [playerArray, gameData, sendPlayerData]);

  useEffect(() => {
    sendPlayerData({ ...gameData, drawDeck: [...drawDeck] });
  }, [drawDeck, sendPlayerData, gameData]);

  useEffect(() => {
    sendPlayerData({ ...gameData, discardDeck: [...discardDeck] });
  });

  const classes = useStyles();
  // useEffect(() => {
  //   joinRoom(props.room);
  // }, [props.room, joinRoom]);
  return (
    <Grid container spacing={2} className={classes.gamePage}>
      <Grid xs={3} item className={classes.sectionContainer}>
        <Grid className={`${classes.info} ${classes.section}`}>
          <GameInfo />
        </Grid>
        <Grid className={`${classes.chat} ${classes.section}`}>
          <Chat
            messages={messages}
            username={props.username}
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
