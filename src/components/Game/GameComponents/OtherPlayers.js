import React, { useContext } from "react";
import Card from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { GameContext } from "../../../shared/GameContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    margin: "auto",
  },
  opponentHand: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100px",
    margin: "auto",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
}));
const OtherPlayers = () => {
  // Expecting a array of players, array is of objects containing username and array of cards in hand
  const classes = useStyles();
  const { playerArray } = useContext(GameContext);
  return (
    <Box className={classes.root}>
      {playerArray.length > 0 &&
        playerArray.map((m, idx) => {
          //this may need to be changed since we are mapping an array of objects
          return (
            <Box key={idx} className={classes.opponentHand}>
              <div className={classes.text}>{m.username}</div>
              <div className={classes.cardContainer}>
                <Card color="purple" value="UNO" size="small" />
              </div>
              {/* Card is a placeholder for when we get a back of card finalized */}
              <div className={classes.text}>
                {m.hand.length} {m.hand.length === 1 ? "card" : "cards"}
              </div>
            </Box>
          );
        })}
    </Box>
  );
};

export default OtherPlayers;
