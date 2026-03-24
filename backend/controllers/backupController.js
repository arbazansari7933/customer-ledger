// controllers/backupController.js
import Bill from "../models/Bill.js";
import Customer from "../models/Customer.js";
import Wholesaler from "../models/Wholesaler.js";
import fs from "fs";

// 🔽 DOWNLOAD BACKUP
export const downloadBackup = async (req, res) => {
  try {
    const bills = await Bill.find();
    const customers = await Customer.find();
    const wholesalers = await Wholesaler.find();

    const data = {
      bills,
      customers,
      wholesalers,
    };

    res.setHeader("Content-Disposition", "attachment; filename=backup.json");
    res.setHeader("Content-Type", "application/json");

    res.send(JSON.stringify(data));

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Backup failed" });
  }
};


// 🔼 RESTORE BACKUP
export const restoreBackup = async (req, res) => {
  try {
    const filePath = req.file.path;

    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);

    const { bills, customers, wholesalers } = data;

    await Bill.deleteMany();
    await Customer.deleteMany();
    await Wholesaler.deleteMany();

    if (bills) await Bill.insertMany(bills);
    if (customers) await Customer.insertMany(customers);
    if (wholesalers) await Wholesaler.insertMany(wholesalers);

    res.status(200).json({ message: "Restore successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Restore failed" });
  }
};