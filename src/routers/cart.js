const express = require("express");
const {
  getCart,
  addProduct,
  updateOrDeleteProduct,
  totalPrice,
  paymentOptions,
  checkout,
  orders
} = require("../controllers/cart");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.get("/", auth, getCart);
router.post("/", auth, addProduct);
router.patch("/", auth, updateOrDeleteProduct);
router.patch("/tprice", auth, totalPrice);
router.patch("/payment", auth, paymentOptions);
router.patch("/checkout", auth, checkout);
router.get("/orders", auth, orders);

module.exports = router;
