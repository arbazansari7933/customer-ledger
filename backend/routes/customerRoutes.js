import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import { addCustomer, customerList , customerDetails, deleteCustomer, editCustomer} from "../controllers/customerController.js";
import { addTransaction, transactionDetails, deleteTransaction, editTransaction} from "../controllers/customerController.js";
const router = express.Router();

//Add customer
router.post("/", authMiddleware, addCustomer);
//Get total list of customer
router.get("/", authMiddleware, customerList);
//Get details of a perticular customer
router.get("/:customerId", authMiddleware, customerDetails);
//Delete a customer
router.delete("/:customerId", authMiddleware, deleteCustomer);
//Edit detail of a customer
router.put("/:customerId", authMiddleware, editCustomer);

//Add a transaction (give or receive)
router.post("/:customerId/transactions", authMiddleware, addTransaction);
//transaction in detail
router.get("/:customerId/transactions/:transactionId", authMiddleware, transactionDetails);
//Delete a particular transaction
router.delete("/:customerId/transactions/:transactionId", authMiddleware, deleteTransaction);
//Edit a particular transaction
router.put("/:customerId/transactions/:transactionId", authMiddleware, editTransaction);

export default router;
