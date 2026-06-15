import {GoogleGenAI} from "@google/genai";
import {chatRepository} from "../repositories/chat.repositorie";

const ai= new GoogleGenAI({
    apiKey: process.env.GEN_AI_KEY || "",
})

type Message = {
    role: "user" | "assistant",
    content: string
}

export const chatService = {
    async sendMessage(prompt: string): Promise<Message> {
        await chatRepository.setConversation("user", prompt);
        const chat = await ai.chats.create({ model: "gemini-3.1-flash-lite" })
        const res = await chat.sendMessage({ message: prompt })
        await chatRepository.setConversation("assistant",(res as any).text)
        return {
            role: "assistant",
            content: (res as any).text
        }
    },
    async getHistory(): Promise<Array<Message>> {
        return chatRepository.getConversation();
    }
}