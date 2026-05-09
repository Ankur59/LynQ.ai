import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import { handleSocketMessage } from "./handlers/chat.socket.js";

let io;

async function initSocket(httpserver) {
    io = new Server(httpserver, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    console.log("Socket initialized");


    io.use(async (socket, next) => {
        try {
            console.log("asdasdasd",socket.handshake.headers.cookie)
            const cookies = cookie.parse(socket.handshake.headers.cookie || "");

            const token = cookies.accessToken;

            if (!token) {
                return next(new Error("Unauthorized"));
            }

            const decoded = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET
            );

            // attach authenticated user to socket
            socket.user = decoded;

            next();
        } catch (error) {
            next(new Error("Unauthorized"));
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket client connected:", socket.id);
        console.log("Authenticated user:", socket.user);

        socket.on("message", async (data) => {
            await handleSocketMessage(socket, data);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
}

async function getIo() {
    if (!io) throw new Error("Socket not initialized");

    return io;
}

export { initSocket, getIo };