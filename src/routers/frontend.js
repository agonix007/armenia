const express = require("express");
const router = new express.Router();

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
router.get("/cart", (req, res) => {
  res.render("cart");
});
router.get("/checkout", (req, res) => {
  res.render("checkout");
});
router.get("/about", (req, res) => {
  res.render("aboutUs");
});
router.get("/successful", (req, res) => {
  res.render("successful");
});
router.get("*", (req, res) => {
  res.status(404).send(`<h1>404 Page not found</h1>`);
});

module.exports = router;