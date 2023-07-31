const express = require("express");
const router = new express.Router();

const authRedirect = require("../middlewares/redirect");
const authCheckout = require("../middlewares/checkoutAuth");
const adminAuth = require("../middlewares/adminAuth");

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/products", (req, res) => {
  res.render("allProducts");
});
router.get("/product", (req, res) => {
  res.render("product");
});
router.get("/about", (req, res) => {
  res.render("aboutUs");
});
router.get("/account", authRedirect, (req, res) => {
  res.render("account", {
    name: req.user.name,
    email: req.user.email,
    address: req.user.address,
    city: req.user.city,
    state: req.user.state,
    zip: req.user.zip,
    walletMoney: req.user.walletMoney.toLocaleString("en-IN"),
    bio: req.user.bio,
    pic: req.user.pic,
  });
});
router.get("/cart", authRedirect, (req, res) => {
  res.render("cart");
});

router.get("/checkout", authRedirect, authCheckout, (req, res) => {
  res.render("checkout", {
    name: req.user.name,
    email: req.user.email,
    address: req.user.address,
    city: req.user.city,
    state: req.user.state,
    zip: req.user.zip,
    walletMoney: req.user.walletMoney.toLocaleString("en-IN"),
  });
});
router.get("/successful", authRedirect, (req, res) => {
  res.render("successful");
});
router.get("/order", authRedirect, (req, res) => {
  res.render("order");
});
router.get("/admin", adminAuth, (req, res) => {
  res.render("admin");
});
router.get("*", (req, res) => {
  res.status(404).render("error");
});

module.exports = router;
