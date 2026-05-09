import chatModel from "../../models/chat.model.js";
import { messageModel } from "../../models/message.model.js";
import {
    generateChatTitle,
    generateResponse,
} from "../../services/ai.service.js";

export const handleSocketMessage = async (socket, data) => {
    const { message, chatId } = data;
    console.log("getting here")
    let title;
    let chat;
    let userId = socket.user._id
    if (!chatId) {
        title = await generateChatTitle(message);

        chat = await chatModel.create({
            userId: userId,
            title: title,
        });

        socket.join(chat._id.toString());
    }

    const userMessage = await messageModel.create({
        chatId: chatId ? chatId : chat._id,
        content: message,
        role: "user",
    });

    const pastMessages = await messageModel
        .find({ chatId: chatId ? chatId : chat._id })
        .sort({ createdAt: 1 });

    const response = await generateResponse(pastMessages);

    const aiResponse = await messageModel.create({
        chatId: chatId ? chatId : chat._id,
        content: response,
        role: "ai",
    });
    console.log(title)
    socket.emit("message_response", {
        title: chatId ? "" : title,
        response: response,
        chatId: chatId ? chatId : chat._id,
    });
};