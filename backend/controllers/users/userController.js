const Users = require("../../models/users/User")
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

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
  const user = await Users.find({ _id: removedCol });
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

const updatePassword = async (req, res) => {
  console.log("Backend reached");
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const { email } = req.params;
  const removedCol = email.replace(':', "")
  const user = await Users.findOneAndUpdate(
    { email: removedCol },
    {
      password: hash,
    },
    { new: true }
  );
  res.send('user password has been updated successfully.')
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
  const { fullname, gender, tel, email, address, username, password, userGroupID } = req.body;

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

const sendEmail = async (req, res) => {
  const email = req.body.resetMail;
  const user = await Users.findOne({ email: email });
  if (user) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alasabdirahman@gmail.com',
        pass: 'teib miin hciz nypc'
      }
    });

    var mailOptions = {
      from: 'alas.abdirahman@yooltech.com',
      to: email,
      subject: 'Reset password link',
      html: `<br><img style="width:60%;display: block;margin-left: auto; margin-right: auto;width: 50%;" src="cid:unique@cid"/> <br>
      Hello ${user.username},<br>Your reset password link has been sent to you,<br>
please click the link below to reset your password. 
<br>http://192.168.5.7:3000/resetPassword?email=${email} <br>
<br> <br>Regards,<br>YoolTech - Made with Love in Hamer.`,
      attachments: [{
        filename: 'yooltech.png',
        path: __dirname + '/yooltech.png',
        cid: 'unique@cid' //same cid value as in the html img src
      }]
      
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send(`A reset password link has been sent to ${email}.`);
      }
    });
  }
  else {
    res.send("Email address not exist.")
  }

};

module.exports = {
  loginUser,
  signupUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  sendEmail,
  updatePassword
}