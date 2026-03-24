import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { totalSales } from "../controllers/reportController.js";

const router=express.Router();
router.post("/", authMiddleware, totalSales);
export default router;