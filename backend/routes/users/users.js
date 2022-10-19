const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  deleteUser,
  signupUser,
  updateUser,
  loginUser,
  changePassword,
} = require("../../controllers/users/userController");

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", signupUser);
router.post("/login", loginUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);
router.patch("/change/:id", changePassword);

module.exports = router;
