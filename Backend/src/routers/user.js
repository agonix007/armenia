const express = require("express");
const { getUser, setFullAddress } = require("../controllers/user");

const router = new express.Router();

router.get("/:id", getUser);
router.patch("/:id", setFullAddress);

module.exports = router;
