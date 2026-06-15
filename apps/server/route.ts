import express from "express";
import { chatController } from "./controllers/chat.controller";
const router = express.Router();

router.get("/api/chat-history", chatController.getHistory);

router.post("/api/send-message", chatController.sendMessage);

export default router;