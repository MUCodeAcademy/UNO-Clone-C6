import {React, useState} from "react"
import useSocket from '../../../hooks/useChat.js'
import Chat from './GameComponents/Chat'



const GamePage = (props) => {
    const {messages, gameData, sendMessage, joinRoom} = useSocket(props.username, props.room, props.host) //placeholder for testing
    
}

export default GamePage