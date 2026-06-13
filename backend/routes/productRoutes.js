import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addStockFull, getProduct, getAllProducts, getCategories, getByCategory, deleteProduct, getProductById, updateStock} from "../controllers/productController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/categories", authMiddleware, getCategories);
router.get("/categories/:name", authMiddleware, getByCategory);
router.get("/", authMiddleware, getAllProducts);

// Product by MongoDB id
router.get("/id/:id", authMiddleware, getProductById);

router.post("/",authMiddleware, addStockFull);
router.get("/:code", authMiddleware, getProduct);

router.delete("/:id", authMiddleware, checkRole(["owner"]), deleteProduct);
router.patch( "/:id/stock", authMiddleware, checkRole(["owner"]), updateStock );

export default router;