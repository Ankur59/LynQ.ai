import chatModel from "../models/chat.model.js"
import { messageModel } from "../models/message.model.js"
import { generateChatTitle, generateResponse } from "../services/ai.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const handleMessage = async (req, res) => {
    const { message } = req.body
    const title = await generateChatTitle(message)
    const response = await generateResponse(message)
    const chat = await chatModel.create({
        userId: req.user._id,
        title: title
    })
    const useMessage = await messageModel.create({
        chatId: chat._id,
        content: message,
        role: "user"
    })
    const aiResponse = await messageModel.create({
        chatId: chat._id,
        content: response,
        role: "ai"
    })
    console.log("this is chat created", chat)
    res.status(200).json(new ApiResponse(200, { title: title, response: response, chatId: chat._id }, "chat created successfully"))
}