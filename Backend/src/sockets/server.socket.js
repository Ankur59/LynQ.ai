import { Server } from "socket.io"
let io
async function initSocket(httpserver) {
    io = new Server(httpserver,
        {
            cors: {
                origin: "http://localhost:5173",
                credentials: true
            }
        })
    console.log("Socket intialized")
    io.on("connect", (socket) => {
        console.log("socket client connected: ", socket.id)
    })
}


async function getIo() {
    if (!io) throw new Error("Socket not initialized")
    return io
}
export { initSocket, getIo }