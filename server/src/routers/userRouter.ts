import { Router } from "express";

import { userController } from "../controllers/userController";
import { authMiddleware } from "../midelvware/authMidleware";
const router = Router();

router.get("/", userController.get);
router.get("/activate", userController.activate);
router.post("/new", userController.post);
router.post("/auth", authMiddleware.checkUserActiveOrExit, userController.auth);
router.get("/checkToken", userController.checkToken);
router.get("/gd", userController.getById);
router.delete("/gd", userController.delete);
router.get("/checkTokenA", userController.checkAdmin);

router.patch("/forceNoActivate", userController.forceNoActivate);
router.patch("/forceActivate", userController.forceActivate);

export const UserRouter = router;
