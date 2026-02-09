import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addWholesaler, wholesalerList, wholesalerDetails, deleteWholesaler , editWholesaler} from "../controllers/wholesalerController.js";
import { addTransaction, transactionDetails , deleteTransaction, editTransaction} from "../controllers/wholesalerController.js";

const router = express.Router();

router.post("/", authMiddleware, addWholesaler);
router.get("/", authMiddleware, wholesalerList);
router.get("/:wholesalerId", authMiddleware, wholesalerDetails);
router.delete("/:wholesalerId", authMiddleware, deleteWholesaler);
router.put("/:wholesalerId", authMiddleware, editWholesaler);

router.post("/:wholesalerId/transactions", authMiddleware, addTransaction);
router.get("/:wholesalerId/transactions/:transactionId", authMiddleware, transactionDetails);
router.delete("/:wholesalerId/transactions/:transactionId", authMiddleware, deleteTransaction);
router.put("/:wholesalerId/transactions/:transactionId", authMiddleware, editTransaction);

export default router;
