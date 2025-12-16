import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addWholesaler, wholesalerList, wholesalerDetails, deleteWholesaler , editWholesaler} from "../controllers/wholesalerController.js";
import { addTransaction, transactionDetails , deleteTransaction, editTransaction} from "../controllers/wholesalerController.js";

const router = express.Router();

router.post("/add-wholesaler", authMiddleware, addWholesaler);
router.get("/wholesalerList", authMiddleware, wholesalerList);
router.get("/wholesalerDetails/:wholesalerId", authMiddleware, wholesalerDetails);
router.delete("/deleteWholesaler/:wholesalerId", authMiddleware, deleteWholesaler);
router.put("/editWholesaler/:wholesalerId", authMiddleware, editWholesaler);
router.post("/:wholesalerId/transactions", authMiddleware, addTransaction);
router.get("/:wholesalerId/transactions/:transactionId", authMiddleware, transactionDetails);
router.delete("/:wholesalerId/transactions/:transactionId", authMiddleware, deleteTransaction);
router.put("/:wholesalerId/transactions/:transactionId", authMiddleware, editTransaction);

export default router;
