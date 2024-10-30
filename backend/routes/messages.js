import express from "express";
import { deleteMessage, getMessages, sendMessage } from "../controllers/messageController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", authenticate, getMessages);
router.post("/", authenticate, sendMessage);
router.delete("/:id", authenticate, deleteMessage);

export default router;
