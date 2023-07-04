const express = require("express");
const {getCart, addProduct, updateOrDeleteProduct} = require("../controllers/cart");

const router = new express.Router();

router.get("/", getCart);
router.post("/", addProduct);
router.patch("/", updateOrDeleteProduct);

module.exports = router;
