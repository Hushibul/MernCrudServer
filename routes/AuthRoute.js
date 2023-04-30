const express = require("express");

const { registerAuth, loginAuth } = require("../controller/AuthController");

const router = express.Router();

router.post("/auth/login", loginAuth);

router.post("/auth/register", registerAuth);

module.exports = router;
