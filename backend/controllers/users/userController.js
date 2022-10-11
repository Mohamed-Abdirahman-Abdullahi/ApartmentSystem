const Users = require("../../models/users/User")
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// Creating jwt
const createToken = (_id) => {
  return jwt.sign({ _id }, '123abc', { expiresIn: "3d" });
};

// get all users
const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({ created_at: -1 })
  res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
  const id = req.params.id;
  const removedCol = id.replace(':', "")
  const user = await Users.find({_id: removedCol});
  // isUser(user)
  res.status(200).json(user)
}

// delete specific user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const removedCol = id.replace(':', "")
  if (!mongoose.Types.ObjectId.isValid(removedCol)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await Users.findOneAndDelete({ _id: removedCol });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
}

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const removedCol = id.replace(':', "")
  if (!mongoose.Types.ObjectId.isValid(removedCol)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await Users.findOneAndUpdate(
    { _id: removedCol },
    {
      ...req.body,
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
  const { fullname, gender, tel, email, address, username, password, userGroupID} = req.body;

  try {
    const user = await Users.create(
      {
        fullname: fullname,
        gender: gender,
        tel: tel,
        email: email,
        address: address,
        username: username,
        password: password,
        userGroupID: userGroupID
      }
     );
     
    // create a token
    const token = createToken(user._id);


    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  loginUser,
  signupUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser
}