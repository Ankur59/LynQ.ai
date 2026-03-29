import mongoose from "mongoose";
import chatModel from "./chat.model.js";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: chatModel,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        enum: ["user", "ai"]
    }
}, { timestamps: true })

export const messageModel = mongoose.model("message", messageSchema)