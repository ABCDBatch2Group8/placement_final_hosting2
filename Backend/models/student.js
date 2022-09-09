const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let SkillsSchema = new Schema({
    item_id: Number, item_text: String
})

const SignupSchema = new Schema({

    name:               { type: String, required: true },
    email:              { type: String, required: true },
    dwmsid:             { type: String, required: true },
    contactNo:          { type: String, required: true },
    courseInICTAK:      { type: String, required: true },
    qualification:      { type: String, required: true },
    stream:             { type: String, required: true },
    password:           { type: String, required: true },
    resume:             { type: String },

    skills:             { type: [SkillsSchema], default: undefined },

    YearOfPassout:      { type: Number },

    educationMarks:     {
                            Mark10: { type: Number }, 
                            Mark12: { type: Number }, 
                            QualificationMark: { type: Number }
                        },

    courseStatus:       { type: String },
    ICTAKscore:         { type: Number },
    location:           { type: String },
    readyToRelocate:    { type: String },
    employmentStatus:   { type: String },
    careerBreak:        { type: String },


    YearOfPassout:      { type: Number },

    educationMarks:     {
        Mark10:           { type: Number },
        Mark12:           { type: Number },
      QualificationMark:  { type: Number },
    },

    courseStatus:       { type: String },
    ICTAKscore:         { type: Number },
    location:           { type: String },
    readyToRelocate:    { type: String },
    employmentStatus:   { type: String },
    careerBreak:        { type: String }
});
const Student = mongoose.model("Student", SignupSchema);
module.exports = Student;
