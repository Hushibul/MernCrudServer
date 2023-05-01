const Product = require("../models/ProductModel");

//Create Product
const createProduct = async (req, res, next) => {
  try {
    const { productname, description, category, price, stock, size } = req.body;

    if (!productname || !description || !category || !price) {
      res
        .status(301)
        .json({ message: "Please fill up all the provied fields" });
    } else {
      const existingProduct = await Product.findOne({ productname });

      if (existingProduct) {
        res.status(306).json({ message: "Product already exists!" });
      } else {
        const product = new Product({
          productname,
          description,
          category,
          price,
          stock,
          size,
        });

        await product.save();

        res.status(201).json(product);
      }
    }
  } catch (err) {
    // res.status(500).json({ error: err });
    next(err);
  }
};

//Find Product By Id
const findSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found!" });
    } else {
      res.status(200).json({ success: true, product });
    }
  } catch (err) {
    next(err);
  }
};

//Find All Products
const findAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();

    if (!product) {
      res.status(204).json({ success: false, message: "No product found!" });
    } else {
      res.status(200).json({ success: true, product });
    }
  } catch (err) {
    next(err);
  }
};

//Update Product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { productname, description, category, price, stock, size } = req.body;

    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { productname, description, category, price, stock, size },
      { new: true }
    );

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

//Delete Product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found!" });
    } else {
      res.status(200).json({
        success: true,
        message: `Product successfully deleted!`,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  findSingleProduct,
  findAllProducts,
  updateProduct,
  deleteProduct,
};
