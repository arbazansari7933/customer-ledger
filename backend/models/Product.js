// models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    productCode: {
      type: String,
      required: true,
      unique: true, // 🔥 important for barcode
    },

    price: {
      type: Number,
      required: true,
    },

    gst: {
      type: Number,
      default: 0, // % like 5, 12, 18
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    category: {
      type: String,
      default: "General",
    },
    
    discount: {
  type: Number,
  default: 0 // % like 10, 20, 25
},

    lowStockAlert: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);