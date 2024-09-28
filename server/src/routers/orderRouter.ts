import { Router } from "express";
import { orderController } from "../controllers/orderController";

const router = Router();

router.post("/save", orderController.saveOrder);
router.get("/getById", orderController.getAllOrdersForUser);
export const OrderRouter = router;
