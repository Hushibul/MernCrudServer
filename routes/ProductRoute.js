const express = require("express");

const {
  createProduct,
  findSingleProduct,
  findAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/ProductController");
const { verifyTokneAndAdmin } = require("../middleware/verifyTokens");

const router = express.Router();

router.post("/products", verifyTokneAndAdmin, createProduct);

router.get("/products/:id", findSingleProduct);

router.get("/products", findAllProducts);

router.put("/products/:id", verifyTokneAndAdmin, updateProduct);

router.delete("/products/:id", verifyTokneAndAdmin, deleteProduct);

module.exports = router;
