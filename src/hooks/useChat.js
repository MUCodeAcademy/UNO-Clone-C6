import {useState, useEffect, useRef} from "react"
import socketIOClient from "socket.io-client"

const SERVER_URL = "http://localhost:3001"

const useChat = (username, room, host) =>{
    const [messages, setMessages] = useState([])
    const socketRef = useRef()
    const [isHost, setIsHost] = useState(host)
    const [gameData, setGameData] = useState({
        deck: [],
        room: "",
        players:[],
        turnPlayer: "",
        playedCard: {},
    })
    useEffect(() => {
        setMessages([])
        socketRef.current = socketIOClient(SERVER_URL)
        socketRef.current.on("leave room", (data)=>{
            setMessages((newMsgs)=>[...newMsgs, data])
        })
        socketRef.current.on("message", (data)=>{
            setMessages((newMsgs)=>[...newMsgs, data])
            console.log([...messages])
        })
        socketRef.current.on("enter room", (data) =>{
            setMessages((newMsgs)=>[...newMsgs, data])
        })

        if(isHost === true){
            socketRef.current.on("host data", (data)=>{
                setGameData({...data})
                socketRef.current.emit("host data send", {...gameData})
            })

            socketRef.current.on("enter room", (data) =>{
                sendPlayerData({...gameData, players: [...players, data]})
            })
        }

        socketRef.current.on("update game", (data)=>{
            setGameData({...data})})

    }, [room])

    function sendMessage(body){
        console.log(body)
        socketRef.current.emit("message", {username: username, body: body, room: room})
    }

    function joinRoom(){
        socketRef.current.emit("join room", {username: username, room: room})
    }

    function sendPlayerData(data){
        socketRef.current.emit("send player data", {...data})
    }

    return {messages: [messages], gameData: gameData, sendMessage, joinRoom, sendPlayerData}
}

export default useChat;

//26
socket.on("send player data",(data) =>{
    io.in(data.room).emit(`host data`, {data})
})

socket.on("host data send", (data) =>{
    io.in(data.room).emit(`update game`, {data})
})

    io.in(socket.room).emit("enter room", {
        username: "SYSTEM", 
        body: `${name} has entered the chat`})

        io.in(room).emit('enter room', {username: username, playerHand: []})
//17