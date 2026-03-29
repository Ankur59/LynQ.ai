import express from "express"
import { handleMessage } from "../controllers/chat.controller.js"

const authRouter = express.Router()


authRouter.post("/message", handleMessage)

export default authRouter