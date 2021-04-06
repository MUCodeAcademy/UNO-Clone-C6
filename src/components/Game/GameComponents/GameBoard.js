import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import Countdown from 'react-countdown';
import "./GameBoard.css"


const GameBoard = (props) => {
    const [gameActive, setGameActive] = useState("");
    const [msg, setMsg] = useState("")
    const [drawedCard, setDrawedCard] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMsg(<Alert severity="error" className="alert">You have {<Countdown date={Date.now() + 30000} />}
              to make a choice or lose a turn!</Alert>);
            setTimeout(() => {
                drawCard()
                regularTurn()
            }, 30000)
        }, 90000)
    }, [canPlay]);


    return (
        <div className="boardContainer">

            <div className="thebigthree">
                <div className="drawContainer">
                    <div style={{ backgroundColor: "black" }} className={`cardback`} onClick={() => { drawCard(); setDrawedCard(true) }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/1280px-UNO_Logo.svg.png" width="100px" height="60px" className="logo" />
                    </div>
                </div>

                <div className="discardContainer">
                    <div style={{ backgroundColor: "white" }} className={`discard`}></div>
                </div>

                <div className="conditionContainer">
                    {isHost !== false && gameActive !== true &&
                        <div className="startDiv">
                            <div className="startButton"
                                onClick={() => { setGameActive(); startGame(); }}>
                                <p>GAME START</p>
                            </div>
                        </div>
                    }

                    {isHost !== true && gameActive !== true &&
                        <div className="text">
                            Waiting on host...
                         </div>
                    }

                    {drawedCard && <Button variant="contained"
                        color="primary"
                        value="regularTurn"
                        className="regularTurn"
                        onClick={() => { regularTurn(); setDrawedCard(false) }}
                    >Next Turn</Button>}

                    <div className="color-area">
                        <div className="color-box" style={{ backgroundColor: "blue" }} onClick={() => setColor("blue")}></div>
                        <div className="color-box" style={{ backgroundColor: "green" }} onClick={() => setColor("green")}></div>
                        <div className="color-box" style={{ backgroundColor: "red" }} onClick={() => setColor("red")}></div>
                        <div className="color-box" style={{ backgroundColor: "yellow" }} onClick={() => setColor("yellow")}></div>
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
                <div>{msg}</div>
            </div>
        </div >
    )
}

export default GameBoard;