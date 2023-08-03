const express = require('express');
const authRoute = require("./auth");
const userRoute = require('./user');
const productRoute = require("./product");
const cartRoute = require("./cart");
const orderRoute = require("./order");

const router = new express.Router();

router.use("/auth", authRoute);
router.use("/account", userRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);
router.use("/orders", orderRoute);

module.exports = router;


