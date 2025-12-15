import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema(
    {
        amount:{type: Number, required: true},
        type:{type: String, enum:["give", "receive"], required: true},
        date:{type: Date, default: Date.now},
        note:{type: String, default:""},
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
)
const wholesalerSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        address:{
            type: String,
            default:"",
        },
        balance:{
            type: Number,
            default: 0,
        },
        transaction:[transactionSchema],
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps: true}
);
export default mongoose.model("Wholesaler", wholesalerSchema)