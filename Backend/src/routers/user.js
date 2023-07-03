const express = require('express');
const {getUser, setAddresses} = require("../controllers/user")

const router = new express.Router();

router.get("/:id", getUser);

router.patch("/:id", setAddresses);

module.exports = router;

