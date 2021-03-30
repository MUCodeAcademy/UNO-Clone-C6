import {React, useState} from "react"
import useChat from '../../../hooks/useChat.js'

const Chat = () => {

    const [msg, setMsg] = useState("");
    const [username, setUsername] = useState("");
    // const [loggedIn, setLoggedIn] = useState(false);
    const [messages, sendMessages] = useChat(username, "Room");

return(<div>yay</div>)
// return(<div>

//     {!loggedIn ? <>
//     <div>
//         <div>Please choose a username:</div>
//         <input type = "text" placeholder = "Username..." value = {username}
//         onChange = {(evt) =>{setUsername(evt.target.value)}}
//         ></input>
//         <button onClick = {() =>{if(username){setLoggedIn(true)}}}>Submit</button>
//     </div>
//     </> :
//     <>
//     <div className = "chatField">
//         {messages.map(m=>{
//             <div>
//                 <b>{m.username}:</b>
//                 {m.time} - {m.body}
//             </div>
//         })}
//     </div>
//     <div className = "inputField">
//         <textarea rows = "6" cols = "50"
//         onChange = {(evt)=>{setMsg(evt.target.value)}}></textarea>
//         <button
//         onClick = {()=>{if(msg){
//             sendMessages(msg)
//             setMsg("")
//         }}}
//         >Send</button>
//     </div>
//     </>}
// </div>)
}

export default Chat