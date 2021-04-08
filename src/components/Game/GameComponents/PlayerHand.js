import React, { useContext } from "react";
import Card from "../GameComponents/Card";
import { makeStyles } from "@material-ui/core/styles";
import { GameContext } from "../../../shared/GameContext";
import { PlaylistAddCheckRounded } from "@material-ui/icons";

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
  const { playerArray, discardDeck, userInfo, playCard } = useContext(
    GameContext
  );
  const me = playerArray.filter(
    (player) => player.username === userInfo.username
  )[0];
  return (
    <>
      <div className={classes.playArea}>
        {me &&
          me.hand &&
          me.hand.map((card, idx) => (
            <Card
              onClick={() => playCard(card, discardDeck[0])}
              color={`${card.color}`}
              value={`${card.value}`}
              key={idx}
            />
          ))}
      </div>
    </>
  );
};

export default PlayerHand;
