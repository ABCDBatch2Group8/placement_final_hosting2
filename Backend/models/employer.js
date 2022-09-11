const mongoose = require('mongoose');

const EmployerSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        index: { unique: true}
    },
    phone : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    gstin: {
        type : String
    },
    companyInfo: {
        type: String
    },
    disable_status: {
        type: String,
        default:"N"
    }   
});

module.exports = mongoose.model('Employers',EmployerSchema)