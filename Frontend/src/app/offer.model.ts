export class OfferModel {
    constructor(
        public job_id: String,
        public dwms_id: String,
        public email: String,
        public batch: String,
        public name: String,
        public company: String,
        public designation: String,
        public offer_date: String,
        public ctc_per_annum: String
    ){}
}