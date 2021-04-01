import React from "react";
import { drawCard, startGame, activeGame, isHost } from "../../../shared/GameContext"
import "./GameBoard.css"

const GameBoard = (props) => {

    return (
        <>
            <div className="boardContainer">

                <div className="drawContainer">

                    <div style={{ backgroundColor: "black" }} className={`cardback`} onClick={() => drawCard()}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/1280px-UNO_Logo.svg.png" width="100px" height="60px" className="logo" />
                    </div>
                </div>

                <div className="discardContainer">
                    <div style={{ backgroundColor: "white" }} className={`discard`}></div>
                </div>

            </div>

            {isHost !== false && gameActive !== true &&
                <div className="startDiv">
                    <div className="startButton"
                        onClick={() => { setGameActive(); startGame(); }}>
                        <p className="gameStart">GAME START</p>
                    </div>
                </div>
            }

            {isHost !== true && gameActive !== true &&
                <div className="text">
                    Waiting on host...
                </div>
            }
        </>

    )
}

export default GameBoard;