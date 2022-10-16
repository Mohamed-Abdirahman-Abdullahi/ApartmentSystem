const connection = require('../../connection/connection');

const incomeSchema = connection.Schema({
    tenant: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    staff:
    {
        type: String,
        required: true
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

const Incomes = connection.model('Income', incomeSchema);
module.exports = Incomes;