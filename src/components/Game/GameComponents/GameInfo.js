import React, { useContext } from "react";
import { GameContext } from "../../../shared/GameContext";
import Container from "@material-ui/core/Container";

const GameInfo = () => {
  const { playerArray, discardDeck, gameActive, isHostCon,  } = useContext(GameContext);

  return (
    <Container>
      {gameActive === false && (
        <>
          {isHostCon === false ? 
          <h3>Waiting for host to start game...</h3>
          :<h3>Start game when you are ready!</h3>}
        </>
      )}

      {gameActive === true && (
        <>
          <button onClick = {()=>{console.log(playerArray)}}></button>
          <h3>{playerArray[0] && `${playerArray[0].username}'s`} turn!</h3>
          <p>The color is {discardDeck[0] && `${discardDeck[0].color}`}</p>
          <p>{playerArray[1] && `${playerArray[1].username}`} is next!</p>
        </>
      )}
    </Container>
  );
};

export default GameInfo;