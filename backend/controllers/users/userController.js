const Users = require("../../models/users/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Creating jwt
const createToken = (_id) => {
  return jwt.sign({ _id }, "123abc", { expiresIn: "3d" });
};

// get all users
const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({ created_at: -1 });
  res.status(200).json(users);
};

// get a single user
const getUser = async (req, res) => {
  const id = req.params.id;
  const removedCol = id.replace(":", "");
  const user = await Users.find({ _id: removedCol });
  // isUser(user)
  res.status(200).json(user);
};

// delete specific user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const removedCol = id.replace(":", "");
  if (!mongoose.Types.ObjectId.isValid(removedCol)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await Users.findOneAndDelete({ _id: removedCol });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// update a user
const updateUser = async (req, res) => {
  const {
    fullname,
    gender,
    tel,
    email,
    address,
    username,
    password,
    userGroupID,
  } = req.body;
  const { id } = req.params;
  const removedCol = id.replace(":", "");
  if (!mongoose.Types.ObjectId.isValid(removedCol)) {
    return res.status(404).json({ error: "No such user" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await Users.findOneAndUpdate(
    { _id: removedCol },
    {
      fullname: fullname,
      gender: gender,
      tel: tel,
      email: email,
      address: address,
      username: username,
      password: hash,
      userGroupID: userGroupID,
    },
    { new: true }
  );

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const {
    fullname,
    gender,
    tel,
    email,
    address,
    username,
    password,
    userGroupID,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await Users.create({
      fullname: fullname,
      gender: gender,
      tel: tel,
      email: email,
      address: address,
      username: username,
      password: hash,
      userGroupID: userGroupID,
    });

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const removedCol = id.replace(":", "");
  let user = await Users.findById(removedCol);
  if (!user) return res.status(401).send("invalid user");

  const validPassword = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!validPassword) return res.status(401).send(" password incorrect");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.newPassword, salt);

  user = await Users.updateOne(
    { _id: user._id },
    {
      password: hashed,
    },
    { new: true }
  );

  res.send(user);
};

module.exports = {
  loginUser,
  signupUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  changePassword,
};
