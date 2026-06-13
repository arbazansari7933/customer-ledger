import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import wholesalerRoutes from "./routes/wholesalerRouter.js";
import billRoutes from "./routes/billRoutes.js";
import reportRoutes  from "./routes/reportRoutes.js";
import backupRoutes from "./routes/backupRoutes.js";
import productRoutes from "./routes/productRoutes.js"

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = process.env.CLIENT_URI.split(",");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
//This tells Express:
//“Any request that starts with /api/auth should go inside authRoutes.js”

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/wholesalers", wholesalerRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/reports", reportRoutes );
app.use("/api", backupRoutes);
app.use("/api/products", productRoutes);

app.get("/api", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api`);
});

