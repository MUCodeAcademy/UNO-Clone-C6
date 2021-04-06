import React, { useContext } from "react";
import Card from "../GameComponents/Card";
import { makeStyles } from "@material-ui/core/styles";
import { GameContext } from "../../../shared/GameContext";

const useStyles = makeStyles((theme) => ({
  playArea: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

const PlayerHand = (props) => {
  const classes = useStyles();
  const { playerArray, userInfo } = useContext(GameContext);
  const me = playerArray.filter((player) => player.userID === userInfo.userID);
  return (
    <>
      <div className={classes.playArea}>
        {me.hand.map((card, idx) => (
          <Card color={`${card.color}`} value={`${card.value}`} key={idx} />
        ))}
      </div>
    </>
  );
};

export default PlayerHand;
