const connection = require('../../connection/connection');

const GrantSchema = connection.Schema({
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
    address:
    {
        type: String,
        required: true,
    },
    title:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String
    }

}, {
    timestamps: true
}

)

const guarantors = connection.model('Guarantors', GrantSchema);
module.exports = guarantors;