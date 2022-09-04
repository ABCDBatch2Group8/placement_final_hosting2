const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const Ictk_student_Schema = new Schema({
    firstname:{type : String},
    lastname:{type : String},
    email :{type : String}
})
const IctkStudent = mongoose.model("Ictkstudent",Ictk_student_Schema);
module.exports = IctkStudent;