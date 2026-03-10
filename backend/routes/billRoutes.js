import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createBill, getAllBills, billDetails , deleteBill} from "../controllers/billController.js";

const router = express.Router();
router.post("/", authMiddleware, createBill);
router.get("/", authMiddleware, getAllBills);
router.get("/:billId", authMiddleware, billDetails);
router.delete("/:billId", authMiddleware, deleteBill);
export default router;