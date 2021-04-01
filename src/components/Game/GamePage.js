import {React, useEffect, useState} from "react"
import useSocket from '../../hooks/useSocket.js'
import Chat from './GameComponents/Chat'
import OtherPlayers from './GameComponents/OtherPlayers'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        border: "2px solid black"
    },
    
    sideContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: "20%",
      maxWidth: '200px',
      border: "2px solid red"
    },

    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '75%',
        border: "2px solid blue"
    },
  }));

const GamePage = (props) => {
    const {messages, gameData, sendMessage, joinRoom} = useSocket(props.username, props.room, props.host) //placeholder for testing
    const classes = useStyles();
    useEffect(()=>{joinRoom(props.room)},[])
    return(
        <div className = {classes.root}>
            <div className = {classes.sideContainer}>
                <div style = {{height: "200px", backgroundColor: "gray"}}>Game Info will go here</div>
                <Chat messages = {messages} username = {props.username} sendMessage = {sendMessage} joinRoom = {joinRoom}></Chat>
            </div>
            <div className = {classes.mainContainer}>
                <OtherPlayers
                players = {[
                {username: "jimbo",
                hand: [{color: "green", value: "7"},
                {color: "red", value: "2"},]
                },

                {username: "jimbo",
                hand: [{color: "green", value: "7"},
                {color: "red", value: "2"},]
                },

                {username: "Nivo",
                hand: [{color: "green", value: "7"},
                {color: "red", value: "2"},
                {color: "blue", value: "Reverse"}]
                },

                {username: "Dude",
                hand: [{color: "green", value: "7"},
                {color: "red", value: "2"},
                {color: "blue", value: "Reverse"}]
                },

                {username: "Man",
                hand: [{color: "green", value: "7"},
                {color: "red", value: "2"},
                {color: "blue", value: "Reverse"}]
                }
                ]}/>
                <div style = {{height: "200px", backgroundColor: "gray"}}></div>
                <div style = {{height: "200px", backgroundColor: "green"}}></div>
            </div>
        <div/>
    </div>
    )
}

export default GamePage