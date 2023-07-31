const express = require("express");
const {
  getCart,
  addProduct,
  updateOrDeleteProduct,
  totalPrice,
  checkout,
} = require("../controllers/cart");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.get("/", auth, getCart);
router.post("/", auth, addProduct);
router.patch("/", auth, updateOrDeleteProduct);
router.patch("/tprice", auth, totalPrice);
router.patch("/checkout", auth, checkout);

module.exports = router;
