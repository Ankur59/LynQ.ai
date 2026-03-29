import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import morgan from "morgan"
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"))

import authRouter from "./routes/auth.routes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";
import chatRouter from "./routes/chat.routes.js"


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/chat", chatRouter)
app.use(errorMiddleware)
export { app };
