import { Router } from "express";
import { novaPoshtaController } from "../controllers/novaPoshtaController";
const router = Router();

router.get("/city", novaPoshtaController.getCity);
router.get("/department", novaPoshtaController.getDepartments);

export const NovaPoshtaRouter = router;
