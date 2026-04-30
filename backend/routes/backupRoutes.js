// routes/backupRoutes.js

import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import { restoreBackup, downloadBackup } from "../controllers/backupController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";


const router = express.Router();

const upload = multer({ dest: "uploads/" });

// ✅ BACKUP (download)
router.get("/backup", downloadBackup);

// ✅ RESTORE (upload)
router.post("/restore", authMiddleware, checkRole(["owner"]), upload.single("file"),  restoreBackup);

export default router;