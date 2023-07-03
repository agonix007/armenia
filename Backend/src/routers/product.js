const express = require("express");
const {getProducts, getProductsById} = require("../controllers/product")


const router = new express.Router();

router.get("/", getProducts);

router.get("/:id", getProductsById);

module.exports = router;
