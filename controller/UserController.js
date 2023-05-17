const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const upload = require("../middleware/multer");

const path = require("path");

//Find User By Id
const findUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
  } catch (error) {
    // res.status(500).send(error);
    next(err);
  }
};

//Find All User
const findAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};

//Update User
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { isAdmin },
      { new: true }
    );

    res.status(203).json({ success: true, user: { isAdmin } });
  } catch (err) {
    // res.status(304).json(err);
    next(err);
  }
};

//Delete User
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.status(200).json({
        success: true,
        message: `User successfully deleted`,
      });
    }
  } catch (err) {
    // res.status(500).json("Internal Server error");
    next(err);
  }
};

//Edit Profile
const editProfile = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const { id } = req.params;
    const { username, email } = req.body;

    const avatar = req.file.filename;
    console.log(avatar);

    const avaterUrl = url + "/uploads/" + avatar;

    const user = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      { username, email, avatar: avaterUrl },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = { findUser, findAllUser, updateUser, deleteUser, editProfile };
