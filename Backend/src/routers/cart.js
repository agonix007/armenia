const express = require("express");
const {getCart, addProduct, updateProduct} = require("../controllers/cart");

const router = new express.Router();

router.get("/", getCart);

router.post("/", addProduct);

router.patch("/", updateProduct);

module.exports = router;
