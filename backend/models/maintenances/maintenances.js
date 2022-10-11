const connection = require('../../connection/connection');

const maintenanceScheme = connection.Schema({
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

const Maintenances = connection.model('Maintenances', maintenanceScheme);
module.exports = Maintenances;