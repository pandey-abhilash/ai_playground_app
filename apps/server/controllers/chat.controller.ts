
import type { Request, Response } from "express";
import { chatService } from "../services/chat.service";

export const chatController = {
    async sendMessage(req: Request, res: Response) {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
        try {
            const message = await chatService.sendMessage(prompt);
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ error: "Failed to send message" });
        }
    },
    async getHistory(req: Request, res: Response) {
        try {
            const history = await chatService.getHistory();
            return res.status(200).json(history);
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to retrieve conversation history" });
        }
    }
}