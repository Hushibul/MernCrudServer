const express = require("express");

const {
  findUser,
  findAllUser,
  updateUser,
  deleteUser,
} = require("../controller/UserController");

const {
  verifyTokneAndUser,
  verifyTokneAndAdmin,
} = require("../middleware/verifyTokens");

const router = express.Router();

//Getting User By Id
router.get("/users/:id", findUser);

//Get All User
router.get("/users", verifyTokneAndUser, findAllUser);

//Updating User
router.put("/users/:id", updateUser);

//Delete User
router.delete("/users/:id", verifyTokneAndAdmin, deleteUser);

module.exports = router;
