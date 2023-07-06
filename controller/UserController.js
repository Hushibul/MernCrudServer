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
  } catch (err) {
    // res.status(500).send(error);
    next(err);
  }
};

//Find All User
const findAllUser = async (req, res, next) => {
  try {
    const sortOrder = req.query.sortOrder;
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const totalUsers = await User.countDocuments();

    const skip = (page - 1) * limit;

    if (sortOrder === "asc") {
      const users = await User.find()
        .sort({ username: "1" })
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        totalUsers,
        currentPage: page,
        totalPage: Math.ceil(totalUsers / limit),
        users,
      });
    } else if (sortOrder === "desc") {
      const users = await User.find()
        .sort({ username: "-1" })
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        totalUsers,
        currentPage: page,
        totalPage: Math.ceil(totalUsers / limit),
        users,
      });
    } else {
      const users = await User.find()
        .sort({ updatedAt: "-1" })
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        totalUsers,
        currentPage: page,
        totalPage: Math.ceil(totalUsers / limit),
        users,
      });

      console.log(page, limit, skip);
    }
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
    next(err);
  }
};

//Edit Profile
const editProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      res.status(404).json({ success: false, message: "User not found!" });
    } else {
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

        res.status(200).json({
          success: true,
          message: "Profile Update Successfully!",
          user,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findUser,
  findAllUser,
  updateUser,
  deleteUser,
  editProfile,
};
