const express = require("express");


const router = new express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello Brother from Cart</h1>");
});

module.exports = router;
