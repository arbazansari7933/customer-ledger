import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createBill, getAllBills, billDetails ,updateBill, deleteBill} from "../controllers/billController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";


const router = express.Router();
router.post("/", authMiddleware, createBill);
router.get("/", authMiddleware, getAllBills);
router.get("/:billId", authMiddleware, billDetails);
router.put("/:id", authMiddleware, checkRole(["owner"]), updateBill);
router.delete("/:billId", authMiddleware, checkRole(["owner"]), deleteBill);
export default router;