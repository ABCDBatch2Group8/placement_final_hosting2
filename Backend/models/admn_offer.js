const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({

    candidateid:{
        type:String
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
    },
    
});

module.exports = mongoose.model('Offer',OfferSchema)