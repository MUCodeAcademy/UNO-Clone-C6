import {React, useEffect, useState} from "react"
import useChat from '../../../hooks/useChat.js'

const Chat = () => {

    const [msg, setMsg] = useState("");
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const {messages, sendMessage, joinRoom} = useChat(username, "room");
    // const [messageDisplay, setMessageDisplay] = useState([])
    // // const {joinRoom} = useChat(joinRoom)

    // useEffect(()=>{setMessageDisplay(messages)},[messages])
// console.log(messages)
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
    <>
    <div className = "chatField" style = {{height: "300px",width: "300px", border: "2px solid black"}}>
        Yo messages length{messages.length}
        {messages.length > 0 && 
        messages.map((m)=>{
            <div>
                <b>{m.username}:</b>
                {m.body}
            </div>
        })
        }
    </div>
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
    </div>
    </>}
</div>)
}

export default Chat