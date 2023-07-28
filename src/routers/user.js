const express = require("express");
const { getUser, setFullAddress } = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.get("/", auth, getUser);
router.patch("/", auth, setFullAddress);

module.exports = router;
