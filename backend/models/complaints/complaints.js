const connection = require('../../connection/connection');

const complaintScheme = connection.Schema({
    tenant : {
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
    timestamps: true}
       
)

const complaints = connection.model('Complaints', complaintScheme);
module.exports = complaints;