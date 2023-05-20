const express = require("express");

const {
  findUser,
  findAllUser,
  updateUser,
  deleteUser,
  editProfile,
} = require("../controller/UserController");

const {
  verifyTokneAndUser,
  verifyTokneAndAdmin,
} = require("../middleware/verifyTokens");
const upload = require("../middleware/multer");

const router = express.Router();

//Getting User By Id
router.get("/users/:id", findUser);

//Get All User
router.get("/users", verifyTokneAndAdmin, findAllUser);

//Updating User
router.put("/users/:id", verifyTokneAndAdmin, updateUser);

//Delete User
router.delete("/users/:id", verifyTokneAndAdmin, deleteUser);

//Edit Profile
router.put(
  "/profile/:id",
  verifyTokneAndUser,
  upload.single("avatar"),
  editProfile
);

module.exports = router;
