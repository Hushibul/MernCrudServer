const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, "Name should be atleash 3 character"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 1,
      trim: true,
      min: [1, "Minimum length should be 1"],
    },
    size: {
      type: String,
      enum: ["m", "l", "xl"],
      default: "m",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
