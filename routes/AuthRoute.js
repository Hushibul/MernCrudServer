const express = require("express");
const passport = require("passport");

const {
  registerAuth,
  loginAuth,
  googleCallback,
  googleSuccessRedirect,
  googleAuthenticate,
} = require("../controller/AuthController");

const router = express.Router();

router.post("/login", loginAuth);

router.post("/register", registerAuth);

router.get("/google", googleAuthenticate);
// router.get("/google/callback", googleCallback, (req, res) => {
//   res.redirect("/success");
// });

router.get("/google/callback", googleCallback, googleSuccessRedirect);

module.exports = router;
