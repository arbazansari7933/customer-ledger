import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addWholesaler, wholesalerList, wholesalerDetails, deleteWholesaler , editWholesaler} from "../controllers/wholesalerController.js";
import { addTransaction, transactionDetails , deleteTransaction, editTransaction} from "../controllers/wholesalerController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addWholesaler);
router.get("/", authMiddleware, wholesalerList);
router.get("/:wholesalerId", authMiddleware, wholesalerDetails);
router.delete("/:wholesalerId", authMiddleware, checkRole(["owner"]), deleteWholesaler);
router.put("/:wholesalerId", authMiddleware, checkRole(["owner"]), editWholesaler);

router.post("/:wholesalerId/transactions", authMiddleware, checkRole(["owner"]), addTransaction);
router.get("/:wholesalerId/transactions/:transactionId", authMiddleware, transactionDetails);
router.delete("/:wholesalerId/transactions/:transactionId", authMiddleware, checkRole(["owner"]), deleteTransaction);
router.put("/:wholesalerId/transactions/:transactionId", authMiddleware, checkRole(["owner"]), editTransaction);

export default router;
