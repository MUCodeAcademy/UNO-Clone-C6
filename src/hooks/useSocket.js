import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

const useSocket = (username, userID, room) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const [isHostSoc, setIsHostSoc] = useState();
  const [gameData, setGameData] = useState({
    drawDeck: [],
    discardDeck: [],
    players: [],
    // room: "",
  });
  useEffect(() => {
    setMessages([]);
    socketRef.current = socketIOClient(SERVER_URL);
    socketRef.current.on("leave room", (data) => {
      setMessages((newMsgs) => [...newMsgs, data]);
    });
    socketRef.current.on("message", (data) => {
      setMessages((newMsgs) => [...newMsgs, data]);
      console.log([...messages]);
    });
    socketRef.current.on("enter room", (data) => {
      console.log(data);
      setMessages((newMsgs) => [
        ...newMsgs,
        { username: "SYSTEM", body: `${data.username} has entered the Room` },
      ]);
    });

    if (isHost === true) {
      socketRef.current.on("host data", (data) => {
        setGameData({ ...data });
        socketRef.current.emit("host data send", { ...gameData });
      });

      socketRef.current.on("enter room", (data) => {
        sendPlayerData({ ...gameData, players: [...gameData.players, data] });
      });
    }

    socketRef.current.on("update game", (data) => {
      setGameData({ ...data });
    });
  }, [room]);

  function sendMessage(body) {
    console.log(body);
    socketRef.current.emit("message", {
      username: username,
      body: body,
      room: room,
    });
  }

  function joinRoom() {
    socketRef.current.emit("join room", { username: username, room: room });
  }

  function sendPlayerData(data) {
    socketRef.current.emit("send player data", { ...data });
  }

  return {
    messages: [messages],
    gameData: gameData,
    sendMessage,
    joinRoom,
    sendPlayerData,
  };
};

export default useSocket;
