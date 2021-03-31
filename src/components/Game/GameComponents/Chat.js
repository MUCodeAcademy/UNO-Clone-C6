import {React, useEffect, useState, useRef} from "react"
import useChat from '../../../hooks/useChat.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import ScrollToBottom from 'react-scroll-to-bottom'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      maxWidth: '200px'
    },

    chatDisplay: {
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: `auto`,
        textOverflow: `clip`,
        height: '200px'
    }
  }));
const Chat = (props) => {

    //Chat will need the Username and the Room passed through props
    const [msg, setMsg] = useState("");
    const [username, setUsername] = useState(""); //
    const [loggedIn, setLoggedIn] = useState(false);
    const {messages, sendMessage, joinRoom} = useChat(username, "room" //placeholder for testing
        // props.username, props.room what it will actually be
        );
    const classes = useStyles();


return(<div>

    {!loggedIn ? <>
    <div>
        <div>Please choose a username:</div>
        <input type = "text" placeholder = "Username..." value = {username}
        onChange = {(evt) =>{setUsername(evt.target.value)}}
        ></input>
        <Button variant = "contained" color = "primary" onClick = {() =>{if(username){setLoggedIn(true)}}}>Submit</Button>
    </div>
    </> :
    <div className = {classes.root}>
        <ScrollToBottom debug = {false} className = {classes.root, classes.chatDisplay}>
            {messages[0].length > 0 && 
                messages[0].map((m, idx)=>{
                    return(
                    <div className = {classes.root} style = {{textAlign: "left"}}key={idx}>
                        <b>{m.username}</b>
                        <div style = {{maxWidth: "200px"}}>{m.body}</div>
                    </div>)
                })
            }
        </ScrollToBottom>
        <div className = {classes.root}>
            <TextField multiline variant = "filled" placeholder = "Chat here..." value = {msg} className = {classes.root}
            onChange = {(evt)=>{setMsg(evt.target.value)}}></TextField>
            <Button variant = "contained" color = "primary"
                onClick = {()=>{if(msg){
                    sendMessage(msg)
                    setMsg("")
                }}}>Send</Button>
            <button onClick = {()=>{joinRoom()}}>Join Room</button> 
        </div>
    </div>}
</div>)
}

export default Chat