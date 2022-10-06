const connection = require('../../connection/connection');

const empSchema = connection.Schema({
    fullname: {
        type: String,
        required: true,

    },
    gender:
    {
        type: String,
        required: true,

    },

    tel:
    {
        type: Number,
        required: true,

    }
    ,
    email:
    {
        type: String,
        required: true,

    }
    ,
    address:
    {
        type: String,
        required: true,
    },
    department:
    {
        type: String,
        required: true,

    },

    salary:
    {
        type: Number,
        required: true,

    },


    createdBy:
    {
        type: String,
        required: true,

    },
    status:
    {
        type: Boolean,
        default: false

    },

}, {
    timestamps: true
}

);

const empolyees = connection.model('empolyees', empSchema);
module.exports = empolyees;