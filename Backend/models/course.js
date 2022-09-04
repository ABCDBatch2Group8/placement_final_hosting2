const mongoose=require('mongoose');

const couseSchema=mongoose.Schema({
    course:String,
    category:String
});
var courseModel=mongoose.model('course',couseSchema);
module.exports=courseModel;