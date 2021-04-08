import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { GameContext } from "../../../shared/GameContext";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    boxShadow: "inset 0px 0px 10px 5px rgba(0,0,0, 0.5)"
  },
}));

const GameInfo = () => {
  const classes = useStyles();
  const { playerArray, discardDeck, gameActive, isHostCon,  } = useContext(GameContext);

  return (
    <Container className = {classes.root}>
      {gameActive === false && (
        <>
          {isHostCon === false ? 
          <h3>Waiting for host to start game...</h3>
          :<h3>Start game when you are ready!</h3>}
        </>
      )}

      {gameActive === true && (
        <div>
          <h3>{playerArray[0] && `${playerArray[0].username}'s`} turn!</h3>
          <div>The current color is:  <div style = {{color: `${discardDeck[0].color}`, fontWeight: "bold"}}>{discardDeck[0] && `${discardDeck[0].color.toUpperCase()}`}</div></div>
          <div>{playerArray[1] && `${playerArray[1].username}`} is next!</div>
        </div>
      )}
    </Container>
  );
};

export default GameInfo;