const connection = require('../../connection/connection');

const visitorScheme = connection.Schema({
    fullname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    tel:
    {
        type: Number,
        required: true,

    },
    address:
    {
        type: String,
        required: true
    },
    tenant:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }

)

const visitors = connection.model('Visitor', visitorScheme);
module.exports = visitors;