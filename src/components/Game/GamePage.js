import { React, useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket.js";
import Chat from "./GameComponents/Chat";
import OtherPlayers from "./GameComponents/OtherPlayers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GameInfo from "./GameComponents/GameInfo.js";
import PlayerHand from "./GameComponents/PlayerHand.js";

const useStyles = makeStyles((theme) => ({
  gamePage: {
    width: "100%",
    height: "80vh",
    padding: 10,
    margin: "0px !important",
  },
  otherPlayers: {
    flexBasis: 150,
    margin: "8px auto",
    width: "calc(100% - 16px)",
  },
  info: {
    flexBasis: 150,
    width: "calc(100% - 18px)",
    textAlign: "center",
    margin: "8px auto",
  },
  chat: {
    flexBasis: "calc(100% - 216px)",
    width: "calc(100% - 18px)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  sectionContainer: {
    padding: "5px !important",
    display: "flex",
    flexDirection: "column",
  },
  gameBoard: {
    width: "calc(100% - 16px)",
    flexBasis: "calc(100% - 330px)",
    margin: "5px auto",
  },
  section: { border: "1px solid black", padding: 8 },

  playerHand: {
    flexBasis: 200,
    width: "calc(100% - 16px)",
    margin: "8px auto",
  },
}));

const GamePage = (props) => {
  const { messages, gameData, sendMessage, joinRoom } = useSocket(
    props.username,
    props.room,
    props.host
  ); //placeholder for testing
  const classes = useStyles();
  useEffect(() => {
    joinRoom(props.room);
  }, []);
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
          <OtherPlayers
            players={[
              {
                username: "jimbo",
                hand: [
                  { color: "green", value: "7" },
                  { color: "red", value: "2" },
                ],
              },

              {
                username: "jimbo",
                hand: [
                  { color: "green", value: "7" },
                  { color: "red", value: "2" },
                ],
              },

              {
                username: "Nivo",
                hand: [
                  { color: "green", value: "7" },
                  { color: "red", value: "2" },
                  { color: "blue", value: "Reverse" },
                ],
              },

              {
                username: "Dude",
                hand: [
                  { color: "green", value: "7" },
                  { color: "red", value: "2" },
                  { color: "blue", value: "Reverse" },
                ],
              },

              {
                username: "Man",
                hand: [
                  { color: "green", value: "7" },
                  { color: "red", value: "2" },
                  { color: "blue", value: "Reverse" },
                ],
              },
            ]}
          />
        </Grid>
        <Grid className={`${classes.gameBoard} ${classes.section}`}>
          <div>Game Board</div>
        </Grid>
        <Grid className={`${classes.playerHand} ${classes.section}`}>
          <PlayerHand
            hand={[
              { color: "green", value: "7" },
              { color: "red", value: "2" },
              { color: "blue", value: "Reverse" },
            ]}
          />
        </Grid>
      </Grid>
      {/* </div> */}
      {/* <div /> */}
      {/* </div> */}
    </Grid>
  );
};

export default GamePage;
