import React from "react";
import Card from "../GameComponents/Card";
import { makeStyles } from "@material-ui/core/styles";

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
  return (
    <>
      <div className={classes.playArea}>
        {props.hand.map((card, idx) => (
          <Card color={`${card.color}`} value={`${card.value}`} key={idx} />
        ))}
      </div>
    </>
  );
};

export default PlayerHand;
