const express = require("express");

const {
  registerAuth,
  loginAuth,
  googleCallback,
  googleAthenticate,
} = require("../controller/AuthController");

const router = express.Router();

router.post("/login", loginAuth);

router.post("/register", registerAuth);

router.get("/google", googleAthenticate);
router.get("/google/callback", googleCallback);

module.exports = router;
