import React, { useEffect, useState, useContext } from "react";
import { GameContext } from "../../../shared/GameContext";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import Countdown from "react-countdown";
import "./GameBoard.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const GameBoard = (props) => {
  const [msg, setMsg] = useState("");
  const [drawedCard, setDrawedCard] = useState(false);
  const [open, setOpen] = useState(false);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
    } else {
      return <span>{seconds}</span>;
    }
  };

  const {
    drawCard,
    canPlay,
    isHost,
    startGame,
    quitGame,
    regularTurn,
    setColor,
    gameActive,
    setGameActive,
  } = useContext(GameContext);

  useEffect(() => {
    setTimeout(() => {
      setMsg(<Countdown renderer={renderer} date={Date.now() + 3000} />);
      setOpen(true);
      setTimeout(() => {
        drawCard();
      }, 30500);
    }, 2000);
  }, [canPlay, drawCard, msg]);

  return (
    <div className="boardContainer">
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Player Timeout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="error" className="alert">
              You have {msg} to make a choice or lose a turn!
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <div className="thebigthree">
        <div className="drawContainer">
          <div
            style={{ backgroundColor: "black" }}
            className={`cardback`}
            onClick={() => {
              drawCard();
              setDrawedCard(true);
            }}
          ></div>
        </div>

        <div className="discardContainer">
          <div style={{ backgroundColor: "white" }} className={`discard`}></div>
        </div>

        <div className="conditionContainer">
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

          {drawedCard && (
            <Button
              variant="contained"
              color="primary"
              value="regularTurn"
              className="regularTurn"
              onClick={() => {
                regularTurn();
                setDrawedCard(false);
              }}
            >
              Next Turn
            </Button>
          )}

          <div className="color-area">
            <div
              className="color-box"
              style={{ backgroundColor: "blue" }}
              onClick={() => setColor("blue")}
            ></div>
            <div
              className="color-box"
              style={{ backgroundColor: "green" }}
              onClick={() => setColor("green")}
            ></div>
            <div
              className="color-box"
              style={{ backgroundColor: "red" }}
              onClick={() => setColor("red")}
            ></div>
            <div
              className="color-box"
              style={{ backgroundColor: "yellow" }}
              onClick={() => setColor("yellow")}
            ></div>
          </div>
        </div>
      </div>

      <div className="right-area">
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
      </div>
    </div>
  );
};
export default GameBoard;
