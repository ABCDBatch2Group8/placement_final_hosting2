const mongoose = require('mongoose');

const PlacementSchema = mongoose.Schema({
    job_id : {
        type : String,
        required: true
    },
    dwms_id : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    batch : {
        type : String
    },
    name : {
        type : String,
        required: true
    },
    company: {
        type : String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    offer_date: {
        type: String,
        required: true
    },
    ctc_per_annum: {
        type: String
    }   
});

module.exports = mongoose.model('Placements',PlacementSchema)