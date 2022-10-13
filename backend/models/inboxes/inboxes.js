const connection = require('../../connection/connection');

const inboxScheme = connection.Schema({
    tenant: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        require: true
    },
    type: 
    {
        type: String,
        required: true
    },
    status:
    {
        type: Boolean,
        default: false
    },
},

    {
        timestamps: true
    }

)

const Maintenances = connection.model('Inboxes', inboxScheme);
module.exports = Maintenances;