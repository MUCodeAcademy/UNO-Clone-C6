import {React, useEffect, useState} from "react"
import useChat from '../../../hooks/useChat.js'

const Chat = (props) => {

    //Chat will need the Username and the Room passed through props
    const [msg, setMsg] = useState("");
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const {messages, sendMessage, joinRoom} = useChat(username, "room");

return(<div>

    {!loggedIn ? <>
    <div>
        <div>Please choose a username:</div>
        <input type = "text" placeholder = "Username..." value = {username}
        onChange = {(evt) =>{setUsername(evt.target.value)}}
        ></input>
        <button onClick = {() =>{if(username){setLoggedIn(true)}}}>Submit</button>
    </div>
    </> :
    <div>
        {messages[0].length > 0 && 
        messages[0].map((m, idx)=>{
            return(
            <div key={idx}>
                <b>{m.username}</b>
                <div>{m.body}</div>
            </div>)
        })
    }
    <div className = "inputField">
        <textarea rows = "6" cols = "50" value = {msg}
        onChange = {(evt)=>{setMsg(evt.target.value)}}></textarea>
        <button
        onClick = {()=>{if(msg){
            sendMessage(msg)
            setMsg("")
        }}}
        >Send</button>
        <button onClick = {()=>{joinRoom()}}>Join Room</button>
        <button onClick = {()=>{console.log(messages); console.log(messages[0].length)}}>log messages</button>

    </div>
    </div>}
</div>)
}

export default Chat