import {useState, useEffect, useRef} from "react"
import socketIOClient from "socket.io-client"

const SERVER_URL = "http://localhost:3000"

const useChat = (username, room) =>{
    const [messages, setMessages] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        setMessages([])
        socketRef.current = socketIOClient(SERVER_URL)
        socketRef.current.on("leave room", (data)=>{
            let newMsgs = [...messages, data]
            setMessages(newMsgs)
        })
        socketRef.current.on("message", (data)=>{
            let newMsgs = [...messages, data]
            setMessages(newMsgs)
        })
        socketRef.current.on("enter room", (data) =>{
            let newMsgs = [...messages, data]
            setMessages(newMsgs)
        })
    }, [room])

    const sendMessage = (body) =>{
        socketRef.current.emit("message", {username: username, body: body, room: room})
    }
    return (messages, sendMessage)
}

export default useChat;