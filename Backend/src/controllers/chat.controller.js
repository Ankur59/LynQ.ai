import chatModel from "../models/chat.model.js"
import { messageModel } from "../models/message.model.js"
import { generateChatTitle, generateResponse } from "../services/ai.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const handleMessage = async (req, res) => {
    const { message, chatId } = req.body
    let title
    let chat
    if (!chatId) {
        title = await generateChatTitle(message)
        chat = await chatModel.create({
            userId: req.user._id,
            title: title
        })
    }

    const userMessage = await messageModel.create({
        chatId: chatId ? chatId : chat._id,
        content: message,
        role: "user",
    })

    const pastMessages = await messageModel.find({ chatId: chatId }).sort({ createdAt: 1 })
    console.log(pastMessages)

    const response = await generateResponse(pastMessages)
    const aiResponse = await messageModel.create({
        chatId: chatId ? chatId : chat._id,
        content: response,
        role: "ai"
    })

    res.status(200).json(new ApiResponse(200, { title: chatId ? "" : title, response: response, chatId: chatId ? chatId : chat._id }))
}