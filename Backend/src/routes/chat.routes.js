import express from "express"
import { handleMessage } from "../controllers/chat.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const authRouter = express.Router()


authRouter.post("/message", authMiddleware(["user"]), handleMessage)

export default authRouter