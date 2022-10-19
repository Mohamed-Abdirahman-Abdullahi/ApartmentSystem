const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  deleteUser,
  signupUser,
  updateUser,
  loginUser,
  sendEmail,
  updatePassword,
  changePassword,
} = require("../../controllers/users/userController");

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", signupUser);
router.post("/login", loginUser);
router.post("/resetRequest", sendEmail);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);
router.patch("/change/:id", changePassword);
router.put("/:email", updatePassword);

module.exports = router;
