import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        qty: {type: Number, required: true, default: 1, min: 1},
        mrp: {type: Number, required: true, min: 0},
        discount: {type: Number, default: 0, min: 0, max: 100},
        finalRate: {type: Number, required: true},
        amount: {type: Number, required: true}
    }
);

const billSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        address: {
            type: String,
            default: "",
        },
        date: { type: Date, default: Date.now },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items:[itemSchema],
        total: {type: Number, required: true, min: 0},
        paid: {type: Number, required: true, min: 0},
        due: {type: Number , required: true, min: 0},
        status:{
            type: String,
            enum:["paid", "due"],
            required: true
        }
        
    },
    {timestamps: true}
);
export default mongoose.model("Bill", billSchema);