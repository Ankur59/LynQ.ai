import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import dotenv from "dotenv";
dotenv.config();

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(message) {
    const response = await geminiModel.invoke([new HumanMessage(message)]);

    return response.text;
}

export async function generateChatTitle(firstMessage) {
    const response = await mistralModel.invoke([
        new SystemMessage(`Generate a clear and concise title (3-6 words) that captures the main intent of the users message
        Focus on key topics and avoid unnecessary words or filler phrases
        Use simple, natural language and make the title specific, not vague
        Return only the title with no extra text, punctuation, or explanation`),
        new HumanMessage(
            `Generate a short 3-5 word title for this message:\n${firstMessage}`,
        ),
    ]);

    return response.text;
}
