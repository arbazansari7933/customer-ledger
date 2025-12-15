import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Check if email already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already register" });
        }
        // 2️⃣ Count users in DB -> to decide role
        const userCount = await User.countDocuments();
        // if first user -> owner, else -> employee
        const role = userCount === 0 ? "owner" : "employee";
        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // 4️⃣ Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        // 5️⃣ Return response
        return res.status(201).json({
            message: "User Created Successfully",
            roleAssigned: role,
            userId: newUser._id,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
}
// LOGIN
export const login = async(req, res)=>{
    try {
        const{email, password}=req.body;
        const user=await User.findOne({email});
        if(!user){
           return res.status(400).json({message: "Invalid email or password"})
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(400).json({message:"Invalid email or password"})
        }
        // 3️⃣ Create JWT token
        const token=jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        res.json({
            message: "Login Successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
}
