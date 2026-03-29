import { generateChatTitle, generateResponse } from "../services/ai.service.js"

export const handleMessage = async (req, res) => {
    const { message } = req.body
    const title = await generateChatTitle(message)
    const response = await generateResponse(message)
    console.log(title)
    res.send(response)
}