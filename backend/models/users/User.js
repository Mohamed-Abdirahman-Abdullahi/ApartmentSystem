const connection = require('../../connection/connection')
const bcrypt = require("bcrypt");
const validator = require("validator");

// Creating user schema
const userSchema = connection.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        gender: {
            type: String, 
            required: true
        },
        tel: {
            type: Number,
            unique: true,
            required: true
        },
         email: { 
            type: String, 
            unique: true,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false
        },
        userGroupID: 
        {
            type: String
        },
        lastLogin: {
            type: Date
        },
        loggedIn: {
            type: Boolean,
            default: false
        },
        noOfTries: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

// static signup method
userSchema.statics.signup = async function (username, email, password, status, userGroupID) {
    // validation
    if (!username || !email || !password || !status || !userGroupID) {
        throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    const account = await this.findOne({ email });

    if (account) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({username:username,  email: email, password: hash , status: status, userGroupID: userGroupID});

    return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Email does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};



// creatin user model
const User = connection.model('Users', userSchema);

module.exports = User;