import mongoose from "mongoose";
import { User } from "./user.model.js";

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true })

const chatModel = mongoose.model('Chat', chatSchema)

export default chatModel