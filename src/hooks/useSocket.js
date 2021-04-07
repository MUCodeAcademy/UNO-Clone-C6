import { useState, useEffect, useRef, useCallback } from "react";
import socketIOClient from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

const useSocket = (room, isHost) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const [isHostSoc] = useState(isHost);
  const [gameData, setGameData] = useState({
    gameActive: false,
    drawDeck: [],
    discardDeck: [],
    players: [],
  });
  useEffect(() => {
    setMessages(() => []);
    socketRef.current = socketIOClient(SERVER_URL, { query: { room } });
    socketRef.current.on("leave room", (data) => {
      setMessages((msgs) => [...msgs, data]);
    });
    socketRef.current.on("message", (data) => {
      setMessages((msgs) => [...msgs, data]);
    });
    // socketRef.current.on("enter room", (data) => {
    //   socketRef.current.emit("message", {
    //     username: "SYSTEM",
    //     body: `${data.username} has entered the chat`,
    //     room: room,
    //   });
    // });

    if (isHostSoc === true) {
      socketRef.current.on("host data", (data) => {
        setGameData({ ...data });
        socketRef.current.emit("host data send", { ...gameData });
      });

      socketRef.current.on("enter room", (data) => {
        sendPlayerData({ ...gameData, players: [...gameData.players, data] });
      });
    } else {
      socketRef.current.on("update game", (data) => {
        setGameData({ ...data });
      });
    }
  }, []);

  const sendMessage = useCallback((body, username) => {
    socketRef.current.emit("message", {
      username,
      body,
      room,
    });
  }, []);

  const joinRoom = useCallback((username) => {
    socketRef.current.emit("join room", { username, room });
  }, []);

  const sendPlayerData = useCallback((data) => {
    socketRef.current.emit("send player data", { ...data });
  }, []);

  return {
    messages,
    gameData,
    sendMessage,
    joinRoom,
    sendPlayerData,
  };
};

export default useSocket;
