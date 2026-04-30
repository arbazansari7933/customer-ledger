// controllers/backupController.js
import Bill from "../models/Bill.js";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import Wholesaler from "../models/Wholesaler.js";
import Product from "../models/Product.js";

import fs from "fs";

// DOWNLOAD BACKUP
export const downloadBackup = async (req, res) => {
  try {
    const bills = await Bill.find();
    const customers = await Customer.find();
    const wholesalers = await Wholesaler.find();
    const user = await User.find();
    const product = await Product.find();

    const data = {
      user,
      bills,
      customers,
      wholesalers,
      product
    };

    res.setHeader("Content-Disposition", "attachment; filename=backup.json");
    res.setHeader("Content-Type", "application/json");

    res.send(JSON.stringify(data));

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Backup failed" });
  }
};


// RESTORE BACKUP
export const restoreBackup = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const rawData = fs.readFileSync(req.file.path, "utf-8");
    const data = JSON.parse(rawData);

    const { user, bills, customers, wholesalers, product } = data;

    await User.deleteMany({});
    await Bill.deleteMany({});
    await Customer.deleteMany({});
    await Wholesaler.deleteMany({});
    await Product.deleteMany({});

    if (user) await User.insertMany(user, { ordered: false });
    if (bills) await Bill.insertMany(bills, { ordered: false });
    if (customers) await Customer.insertMany(customers, { ordered: false });
    if (wholesalers) await Wholesaler.insertMany(wholesalers, { ordered: false });
    if (product) await Product.insertMany(product, { ordered: false });

    res.status(200).json({ message: "Restore successful" });

  } catch (error) {
    console.error("Restore error:", error);
    res.status(500).json({ message: "Restore failed" });
  }
};