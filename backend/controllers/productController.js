import Product from "../models/Product.js";
import QRCode from "qrcode";
import { generateQR } from "../utils/generateQR.js";

function generateProductCode() {
  return "PRD" + Date.now();
}

// GET PRODUCT BY CODE (used in POS scan)
export const getProduct = async (req, res) => {
  try {
    const { code } = req.params;

    const product = await Product.findOne({ productCode: code });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // send only required data
    res.json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        gst: product.gst,
        stock: product.stock,
        productCode: product.productCode,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ADD STOCK + GENERATE QR
export const addStockFull = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      gst = 0,
      discount = 0,
      quantity,
    } = req.body;

    // validation
    if (!name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Name, price and quantity are required",
      });
    }

    // 🔹 find existing product (temporary logic)
    let product = await Product.findOne({ name, category });

    if (product) {
      // update existing product stock
      product.stock += quantity;

      // optional updates
      product.price = price;
      product.discount = discount;
      product.gst = gst;

      await product.save();
    } else {
      // create new product
      product = new Product({
        name,
        category,
        price,
        gst,
        discount,
        stock: quantity,
        productCode: generateProductCode(),
      });

      await product.save();
    }

    // generate QR code
const qrCode = await generateQR(product.productCode);

    //  response
    res.json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        discount: product.discount,
        gst: product.gst,
        stock: product.stock,
        productCode: product.productCode,
      },
      qr: qrCode,     //  use this for sticker
      quantity,       //  print how many stickers
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get product categories
export const getCategories=async(req, res)=>{
  try {
    const categories=await Product.distinct("category")
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

//get product by category
export const getByCategory=async(req, res)=>{
  try {
    const products=await Product.find({
      category: req.params.name
    });
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};