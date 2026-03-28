import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js";
import http from "http"
import { initSocket } from "./sockets/server.socket.js";
dotenv.config({
  path: "./.env",
});

const server = http.createServer(app)
initSocket(server)
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Socket and Http Server is running at port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
