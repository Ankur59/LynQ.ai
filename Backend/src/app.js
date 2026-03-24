import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // allow methods
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routes/auth.routes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";


app.use("/api/v1/auth", authRouter)

app.use(errorMiddleware)
export { app };
