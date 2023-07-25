const express = require("express");
const { getUser, setFullAddress } = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.get("/:id", auth, getUser);
router.patch("/:id", auth, setFullAddress);

module.exports = router;
