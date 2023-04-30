const User = require("../models/UserModel");

//Find User
const findUser = async (req, res) => {
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
};

//Find All User
const findAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update User
const updateUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete({ _id: id });

    res.status(200).json(user.username + "Successfully deleted");
  } catch (err) {
    res.status(500).json("Internal Server error");
  }
};
module.exports = { findUser, findAllUser, updateUser, deleteUser };
