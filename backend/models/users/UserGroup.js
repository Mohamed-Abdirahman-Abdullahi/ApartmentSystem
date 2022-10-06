const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TestDB', { autoIndex: false })
const bcrypt = require("bcrypt");
const validator = require("validator");


// Creating user schema
const userGroupSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        desc: { 
            type: String, 
            required: true
        },
        created_at: { type: Date, default: Date.now },
    },
)

const UserGroup = mongoose.model('UserGroup', userGroupSchema);

module.exports = UserGroup;