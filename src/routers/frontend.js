const express = require("express");
const router = new express.Router();

const auth = require("../middlewares/auth");

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
router.get("/account", (req, res) => {
  res.render("account");
});
router.get("/cart", auth, (req, res) => {
  res.render("cart");
});
router.get("/checkout", auth, (req, res) => {
  res.render("checkout");
});
router.get("/successful", auth, (req, res) => {
  res.render("successful");
});
router.get("*", (req, res) => {
  res.status(404).render("error");
});

module.exports = router;