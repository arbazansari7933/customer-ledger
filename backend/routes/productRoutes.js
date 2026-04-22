import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addStockFull, getProduct, getCategories, getByCategory} from "../controllers/productController.js";

const router = express.Router();

router.get("/categories", authMiddleware, getCategories);
router.get("/categories/:name", authMiddleware, getByCategory);

router.post("/",authMiddleware, addStockFull);
router.get("/:code", authMiddleware, getProduct);



export default router;