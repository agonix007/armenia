const express = require("express");


const router = new express.Router();

router.get("/register", (req, res) => {
  res.send("<h1>Hello Brother from Auth</h1>");
});

module.exports = router;
