import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        // 1️⃣ Get token from header
        let authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        // Normalize case and remove extra spaces/newlines
        authHeader = authHeader.trim().replace(/\s+/g, " ");
        if (!authHeader.toLowerCase().startsWith("bearer ")) {
            return res.status(401).json({ message: "No token provided (wrong format)" });
        }
        const token = authHeader.split(" ")[1];
        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3️⃣ Find user from DB using decoded id
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // 4️⃣ Attach user to request object
        req.user = user;
        // 5️⃣ Continue to next route
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
export default authMiddleware;