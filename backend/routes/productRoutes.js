import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addStockFull, getProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/",authMiddleware, addStockFull);
router.get("/:code", authMiddleware, getProduct );

export default router;