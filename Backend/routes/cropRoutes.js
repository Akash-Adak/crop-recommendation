import { Router } from "express";
const router = Router();
import { recommendCrop } from "../controllers/cropController.js";

router.post("/recommend", recommendCrop);

export default router;
