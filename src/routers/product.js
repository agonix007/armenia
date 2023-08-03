const express = require("express");
const {
  getProducts,
  getProductsById,
  addProducts,
} = require("../controllers/product");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/", auth, addProducts);

module.exports = router;
