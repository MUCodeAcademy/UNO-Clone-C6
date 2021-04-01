import {React, useEffect, useState} from "react"
import useSocket from '../../hooks/useSocket.js'
import Chat from './GameComponents/Chat'
import OtherPlayers from './GameComponents/OtherPlayers'



const GamePage = (props) => {
    const {messages, gameData, sendMessage, joinRoom} = useSocket(props.username, props.room, props.host) //placeholder for testing
    useEffect(()=>{joinRoom(props.room)},[])
    return(
        <>
        <OtherPlayers players = {[...gameData.players]}></OtherPlayers>
        <Chat messages = {messages} username = {props.username} sendMessage = {sendMessage} joinRoom = {joinRoom}></Chat>
        </>
    )
}

export default GamePage