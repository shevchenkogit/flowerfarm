import { Router } from "express";

import { plantsController } from "../controllers/plantsController";
import { storage } from "../midelvware/multer";
import multer from "multer";

const router = Router();
const upload = multer(storage);

router.get("/", plantsController.getAll);
router.delete("/", plantsController.delete);
router.patch("/changePrice", plantsController.changePrice);
router.put("/:plantsId", plantsController.updateById);

router.post("/post", plantsController.post);
router.post(
  "/uploadFull",
  upload.single("file"),
  plantsController.uploadFullImage
);
router.post(
  "/uploadCrop",
  upload.single("file"),
  plantsController.uploadCropedImage
);
router.get("/searchResult", plantsController.search);
router.patch("/sellStatus", plantsController.sellStatus);
router.get("/newItems", plantsController.getNewItem);
router.patch("/have", plantsController.have);
router.get("/getForSell", plantsController.getForSell);
router.patch("/change", plantsController.changeInfo);

export const PlantsRouter = router;
