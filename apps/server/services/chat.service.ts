import { GoogleGenAI } from "@google/genai";
import { chatRepository } from "../repositories/chat.repositorie";

const ai = new GoogleGenAI({
    apiKey: process.env.GEN_AI_KEY || "",
});

type Message = {
    role: "user" | "model",
    content: string
}
type History = {
    role: "user" | "model",
    parts: string[]
};

export const chatService = {
    async sendMessage(prompt: string): Promise<Message> {
        try {
            await chatRepository.setConversation("user", prompt);
            const chat = await ai.chats.create({ 
                model: "gemini-3.1-flash-lite"
            });
            const res = await chat.sendMessage({ 
                message: prompt
            });
            await chatRepository.setConversation("model", (res as any).text)
            return {
                role: "model",
                content: (res as any).text
            }
        } catch (error) {
            console.error("Error sending message:", error); 
            return {
                role: "model",
                content: "Sorry, something went wrong. Please try again later."
            }
        }
    },
    async getHistory(): Promise<Array<History>> {
        return await chatRepository.getConversation();
    }
}