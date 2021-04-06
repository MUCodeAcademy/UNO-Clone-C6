import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import Countdown from "react-countdown";
import "./GameBoard.css";
import { GameProvider } from "../../../shared/GameContext";

const GameBoard = (props) => {
  const [gameActive, setGameActive] = useState("");
  const {} = useContext(GameProvider);
  // fix this later! this is a setTimeout for when a user is idle
  const Message = () => (
    <Alert severity="error">
      You have {<Countdown date={Date.now() + 30000} />}
      to make a choice or lose a turn!
    </Alert>
  );

  return (
    <div className="boardContainer">
      <div className="drawContainer">
        <div
          style={{ backgroundColor: "black" }}
          className={`cardback`}
          onClick={() => drawCard()}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/1280px-UNO_Logo.svg.png"
            width="100px"
            height="60px"
            className="logo"
          />
        </div>
      </div>

      <div className="discardContainer">
        <div style={{ backgroundColor: "white" }} className={`discard`}></div>
      </div>

      {isHost !== false && gameActive !== true && (
        <div className="startDiv">
          <div
            className="startButton"
            onClick={() => {
              setGameActive();
              startGame();
            }}
          >
            <p>GAME START</p>
          </div>
        </div>
      )}

      {isHost !== true && gameActive !== true && (
        <div className="text">Waiting on host...</div>
      )}

      {gameActive !== false && (
        <Button
          variant="contained"
          color="primary"
          value="quitGame"
          className="quitGame"
          onClick={() => quitGame()}
        >
          Quit Game
        </Button>
      )}

      {/* Player turn timeout functionality is incomplete */}
      <Countdown date={Date.now() + 10000}>
        <Message></Message>
      </Countdown>
    </div>
  );
};

export default GameBoard;
