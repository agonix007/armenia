const express = require("express");
const { orders, getOrderItems } = require("../controllers/cart");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.get("/", auth, orders);
router.get("/:id", auth, getOrderItems);

module.exports = router;
