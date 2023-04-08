const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const router = express.Router();

//Createing User
router.post("/users", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  const user = new User({ username, email, password, isAdmin });

  const exitingUser = await User.findOne({ username });

  if (exitingUser) {
    res.status(403).json("Username is already in use");
  }

  try {
    await user.create();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Getting User By Id
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updating User
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { username, email, password },
      { new: true }
    );
    res.status(203).json(user);
  } catch (err) {
    res.status(304).json(err);
  }
});

//Delete User
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete({ _id: id });

    res.status(200).json(user.username + "Successfully deleted");
  } catch (err) {
    res.status(500).json("Internal Server error");
  }
});

//Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user && user.password === password) {
        res.status(200).json(user);
      } else {
        res.status(403).json("User or password wrong");
      }
    } else {
      res.status(404).json("User doesn't exits!");
    }
  } catch (error) {
    res.status(500).json("Serside Error");
  }
});

module.exports = router;
