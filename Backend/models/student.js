const mongoose  = require("mongoose");

const Schema = mongoose.Schema;
const SignupSchema = new Schema({
    name : {type : String,required: true},
    email :{type : String,required: true},
    dwmsid :{type : String,required: true},
    contactNo :{type : String,required: true},
    courseInICTAK : {type : String,required: true},
    qualification : {type : String,required: true},
    stream : {type : String,required: true},
    password : {type : String,required: true},
    resume :{type :String},
    // skill:{type:String}
    // non required groups below
    YearOfPassout:{type:String},
    educationMarks:{
        Mark10:{type : Number},Mark12:{type : Number},QualificationMark:{type : Number}},                  //input year of graduation too10thMark
    // pg : {type:Array},                       //array
     courseStatus:{type : String},             //done
     ICTAKscore: {type:Number},
     location:{type : String},               //Ernakulam
     readyToRelocate :{type : String},           //yes

     employmentStatus : {type : String},//includes fresher better give as an array to include break duration
     careerBreak : {type : String}
    // breakDuration : {type:Number}

});
const Student = mongoose.model("Student",SignupSchema);
module.exports = Student;