const User = require("../models/UserModel");

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
    const { username, email, password, isAdmin } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { username, email, password, isAdmin },
      { new: true }
    );

    res.status(203).json({ success: true, user: { username, email, isAdmin } });
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

module.exports = { findUser, findAllUser, updateUser, deleteUser };
