import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { recommendCrop } from "../controllers/cropController.js";
import { getPredictionHistory } from "../controllers/cropController.js";
const router = Router();

router.post("/recommend", authMiddleware, recommendCrop);
router.get("/history", authMiddleware, getPredictionHistory);
export default router;
