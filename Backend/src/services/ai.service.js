import { HumanMessage } from "@langchain/core/messages"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
})

export async function generateResponse(model, message) {
    const response = await model.invoke([
        new HumanMessage(message)
    ])

    return response.text
}