import { Router } from "express";
import { messageController } from "../controllers/messageController";

const router = Router();

router.get("/", messageController.get);
router.get("/", messageController.getById);
router.delete("/", messageController.delete);
router.get("/filter", messageController.messageFilter);
router.patch("/red", messageController.becomeToRed);
router.post("/new", messageController.newMessage);
router.patch("/replay", messageController.replay);
router.patch("/email", messageController.getMessageByEmail);

export const MessageRouter = router;
