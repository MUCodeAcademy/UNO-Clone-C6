import React, { useContext } from "react";
import GameContext from "../../shared/GameContext";

const GameInfo = () => {
  const { playerArray, discardDeck } = useContext(GameContext);

  return (
    <Container>
      <h3>{playerArray[0].username} turn!</h3>;
      <p>The color is {discardDeck[0].color}</p>
      <p>{playerArray[1].username} is next!</p>
    </Container>
  );
};

export default GameInfo;
