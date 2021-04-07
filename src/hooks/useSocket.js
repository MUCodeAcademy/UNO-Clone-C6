import { useState, useEffect, useRef, useCallback } from "react";
import socketIOClient from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

const useSocket = (room, isHost) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const [isHostSoc] = useState(isHost);
  const [gameData, setGameData] = useState({
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

    socketRef.current.on(`update players on join`, (data) => {
      if (isHostSoc && data.room == room) {
        console.log(data, room);
        setGameData((oldData) => ({
          ...oldData,
          players: [...gameData.players, data.user],
        }));
        // console.log;
        socketRef.current.emit("host data send", { ...gameData });
      }
    });

    socketRef.current.on("host data", (data) => {
      if (!isHostSoc) return;
      setGameData({ ...data });
      socketRef.current.emit("host data send", { ...gameData });
    });

    socketRef.current.on("update game", (data) => {
      if (isHostSoc) return;
      setGameData({ ...data });
    });
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

  const sendJoinGame = useCallback((data) => {
    socketRef.current.emit("send enter room to host", { ...data });
  });

  return {
    messages,
    gameData,
    sendMessage,
    joinRoom,
    sendPlayerData,
    sendJoinGame,
  };
};

export default useSocket;
