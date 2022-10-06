const connection = require('../../connection/connection')

const tenantSchema = connection.Schema({
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
    guarantor:
    {
        type: String,
        required: true,

    },
    createdBy: {
        type: String,
        required: true,
    },

    status: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },

}, {
    timestamps: true
}

)

const tenants = connection.model('tenants', tenantSchema);
module.exports = tenants;