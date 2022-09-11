const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SkillsSchema = new Schema({item_id: Number, item_text: String
                              })

let ApplicantsSchema = new Schema({
  stud_ref: {
    type: String,
    required:true
  },
  shortlist_status:  {
   type: Boolean,
   default: false
  },
  application_status: {
    type:String,
    default: " "
  }
})

let jobsSchema = new Schema({
  jobid: {
    type: String,
    required: true,
    index: { unique: true}
  },
  emp_ref: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  jd_text: {
    type: String,
    required: true
  },
  jd_doc: {
    type: String
  },
  number: {
    type: Number,
    required: true
  },
  salary: {
    type: String
  },
  skills: {
  type: [SkillsSchema],
  default: undefined
  },
  location: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  applicants: {
    type: [ApplicantsSchema],
    default: undefined
  }
}, {
    collection: 'jobs'
  })
module.exports = mongoose.model('Job', jobsSchema)