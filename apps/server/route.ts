import express from "express";
import { chatController } from "./controllers/chat.controller";
const router = express.Router();

router.get("/api/chat-histry", chatController.getHistory);

router.post("/api/chat", chatController.sendMessage);

export default router;