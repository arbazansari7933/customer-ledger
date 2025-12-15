import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Customer from "../models/Customer.js";
import User from "../models/User.js";

import { addCustomer, customerList , customerDetails, deleteCustomer, editCustomer} from "../controllers/customerController.js";
import { addTransaction, transactionDetails, deleteTransaction, editTransaction} from "../controllers/customerController.js";
const router = express.Router();

//Add customer
router.post("/add-customer", authMiddleware, addCustomer);
//Get total list of customer
router.get("/list", authMiddleware, customerList);
//Get details of a perticular customer
router.get("/customerdetail/:customerId", authMiddleware, customerDetails);
//Delete a customer
router.delete("/delete/:customerId", authMiddleware, deleteCustomer);
//Edit detail of a customer
router.put("/update/:customerId", authMiddleware, editCustomer);
//Add a transaction (give or receive)
router.post("/add-transaction/:customerId", authMiddleware, addTransaction);
//transaction in detail
router.get("/:customerId/transaction-details/:transactionId", authMiddleware, transactionDetails);
//Delete a particular transaction
router.delete("/:customerId/transaction/:transactionId", authMiddleware, deleteTransaction);
//Edit a particular transaction
router.put("/:customerId/transaction/:transactionId", authMiddleware, editTransaction);



export default router;
