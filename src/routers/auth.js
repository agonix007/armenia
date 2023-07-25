const express = require("express");
const {
  register,
  login,
  logout,
  logoutFromAll,
} = require("../controllers/auth");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/logoutall", auth, logoutFromAll);

module.exports = router;
