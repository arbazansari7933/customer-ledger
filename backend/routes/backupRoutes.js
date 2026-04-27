// routes/backupRoutes.js

import express from "express";
import multer from "multer";
import { restoreBackup, downloadBackup } from "../controllers/backupController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";


const router = express.Router();

const upload = multer({ dest: "uploads/" });

// ✅ BACKUP (download)
router.get("/backup", downloadBackup);

// ✅ RESTORE (upload)
router.post("/restore", upload.single("file"), checkRole(["owner"]), restoreBackup);

export default router;