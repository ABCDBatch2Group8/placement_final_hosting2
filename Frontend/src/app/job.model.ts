import { ObjectId } from "mongodb";

export class JobModel {
    constructor(
        public jobid: String,
        public emp_ref: String | null,
        public company: String | null,
        public position: String,
        public jd_text: String,
        public number: String,
        public salary: String,
        public skills: Array<any>,
        public location: String,
        public start_date: Date,
        public end_date: Date
    ){}
}