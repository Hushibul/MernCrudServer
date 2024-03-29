const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/UserModel");

//Login Controller
const loginAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User doesn't exist! Please register" });
    } else {
      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        res.status(403).json({ message: "Invalid user or password!" });
      } else {
        // res.status(200).json("Ok");
        const token = jwt.sign(
          {
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.status(200).json({
          token: token,
          user: {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

//Register Controller
const registerAuth = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(403).json({ message: "Please fill up the required fields!" });
    } else {
      const existingUser = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });

      if (existingUser) {
        res
          .status(301)
          .json({ message: "User already exists! Try out a different one." });
      } else if (existingUsername) {
        res.status(301).json({ message: "Username is already in use!" });
      } else {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign(
          { _id: user._id, username: user.username, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(201).json({ token: token, username });
      }
    }
  } catch (err) {
    next(err);
  }
};

const googleAuthenticate = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleSuccessRedirect = (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/success");
};

const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

module.exports = {
  loginAuth,
  registerAuth,
  googleAuthenticate,
  googleSuccessRedirect,
  googleCallback,
};
