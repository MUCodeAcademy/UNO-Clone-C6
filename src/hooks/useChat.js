import {useState, useEffect, useRef} from "react"
import socketIOClient from "socket.io-client"

const SERVER_URL = "http://localhost:3001"

const useChat = (username, room) =>{
    const [messages, setMessages] = useState([])
    const socketRef = useRef()
    useEffect(() => {
        setMessages([])
        socketRef.current = socketIOClient(SERVER_URL)
        socketRef.current.on("leave room", (data)=>{
            setMessages((newMsgs)=>[...newMsgs, data])
        })
        socketRef.current.on("message", (data)=>{
            // console.log(data)
            // let newMsgs = [...messages, data]
            // console.log(newMsgs)
            // console.log([...newMsgs])
            setMessages((newMsgs)=>[...newMsgs, data])
            console.log([...messages])
        })
        socketRef.current.on("enter room", (data) =>{
            setMessages((newMsgs)=>[...newMsgs, data])
        })
    }, [room])

    function sendMessage(body){
        console.log(body)
        socketRef.current.emit("message", {username: username, body: body, room: room})
    }

    function joinRoom(){
        socketRef.current.emit("join room", {username: username, room: room})
    }
    return {messages: [messages], sendMessage, joinRoom}
}

export default useChat;