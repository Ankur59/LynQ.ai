import { io } from "socket.io-client";

export const initSocketConnection = async () => {
  const socket = io("http://localhost:8000", {
    withCredentials: true,
  });
  console.log("running");

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  return socket;
};
