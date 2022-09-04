const express = require("express");
const route = express.Router();
const Student = require("../models/student");
const IctkStudent = require("../models/ictak_student")
const Course = require("../models/course")
const Jobs = require("../models/job")
const multer  = require("multer");

// file upload using multer
const storage = multer.diskStorage({
  destination:(req , file, callBack)=>{
    callBack(null, 'uploads')
  },
  filename: (req, file, callBack)=>{
    callBack(null, `resume_${file.originalname}`)
  }
})
let  upload = multer({storage: storage});

route.post('/file', upload.single('file'), function(req, res,next) {
  // console.log("in file post"+req.body)
  // console.log(req.file);
  // console.log(file.filename);
  const file=req.file;
  if(!file) {
       const error = new Error("please uplod a file")
       error.httpStatusCode = 400;
       return next(error)
  }
  res.send(file) 
 });

//  multer file saved



route.post("/signin",(req,res)=>{
    // res.send("hello")
    let data = {
      name : req.body.data.name,
      email :req.body.data.email,
      dwmsid :req.body.data.dwmsid,
      contactNo : req.body.data.contactNo,
      courseInICT : req.body.data.courseInICT,
      qualification : req.body.data.qualification ,
      stream :req.body.data.stream,
      password : req.body.data.password
  } 
  console.log(data.email);
    IctkStudent.findOne({"email":data.email}, function(err,val){
      if(err){
        console.log(err);
      }
       if(val === null){
        console.log("no email found");
        res.json({status: "no email found"});
      }
      else{
        {
          console.log("data found in admin db")  
              
          Student.find({"email":data.email}, function(err,docs){
            console.log(docs)
            if(err){
              console.log(err);
            }
            else if(docs.length){       
              console.log("User exists");
                res.json({status: "User Email already registered"});
            }
            else{
              let stud = new Student(data);
              stud.save();
              res.json({status: "Success"});                    
            }         
        }); 
        }
      }
      })
})

route.get("/signin",(req,res)=>{
    Course.find().then(function(course){
      res.send(course);
    })
})

route.post('/login', (req, res) => {
    Student.findOne({'email' :req.body.email},function(err, user){
      if(user=== null){
        console.log("no data found")
        res.json({status: "invalid"});
        // res.json({status: "user doesnot exist"});
      }
      else if(err) {
        console.log('LOGIN ERROR RESPONSE')
        res.json(err)
    }
     else if((user.email == req.body.email)&&(user.password == req.body.password )){
          console.log("correct");
          // let payload = {subject: user.email + user.password};
          // let token = jwt.sign(payload, 'secretKey');
          // res.status(200).send({token});
          res.json({"message":"Login successful","status":"success","id":user._id});
    }
    else {
      console.log(" wrong details");
      res.json({status: "invalid"});
    }
  });              
     
})

route.get('/dashboard/:id',async (req,res)=>{
  console.log(req.params);
  try{
    const id = req.params.id;
    const stud_data = await Student.findById({"_id":id}); 
    res.json(stud_data);
    console.log("student data"+stud_data);
}catch(err){
    console.log("profile data not correct");
    res.json({message: "data not fetched"})
}
});


route.put('/dashboard/update', async (req, res) => {
  // console.log("in update ");
  // console.log(req.body); 
  // console.log(req.body._id); 
  console.log( "in update backend", req.body)  
  
  try{
  await Student.findByIdAndUpdate({"_id":req.body._id},
           {$set:{"name":req.body.name,
                  "email":req.body.email,
                  "dwmsid":req.body.dwmsid,
                  "contactNo":req.body.contactNo,
                  "courseInICTAK":req.body.courseInICT,
                  "password": req.body.password,      
                  "qualification": req.body.qualification,
                  "stream": req.body.stream,
                  "resume":req.body.resume
                  
           }}     
  )}catch(err){
      console.log("In error /update")
      res.json({ message: err });
   }   
}); 
// @@@@@@@@@@@second page@@@@@@@@@@@

route.put('/dashboard/update2', async (req, res) => {
  console.log("in update ");
  // console.log(req.body); 
  console.log(req.body._id);   
  
  try{
  await Student.findByIdAndUpdate({"_id":req.body._id},
           {$set:{"courseStatus":req.body.courseStatus,
                  "ictMarks":req.body.ictMarks,
                  "location":req.body.location,
                  "readyToRelocate":req.body.readyToRelocate,
                  "employmentStatus":req.body.employmentStatus,
                  "careerBreak": req.body.careerBreak ,
                  'educationMarks.Mark10':req.body.educationMarks.Mark10,
                  'educationMarks.Mark12':req.body.educationMarks.Mark12,
                  'educationMarks.QualificationMark':req.body.educationMarks.QualificationMark,
                  'YearOfPassout':req.body.YearOfPassout
      
           }}
  )}catch(err){
      console.log("In error /update2")
      res.json({ message: err });
   }   
}); 

// jobs displaying
// route.get('/history/:id',async (req,res)=>{
//   console.log("in history get req :",req.params);
//   try{
//     const id = req.params.id;
//     const stud_data = await Student.findById({"_id":id}); 
//     res.json(stud_data);
//     console.log("student data"+stud_data);
// }catch(err){
//     console.log("profile data not correct");
//     res.json({message: "data not fetched"})
// }
// });
// ??????????????pending
route.get("/jobListing",(req,res)=>{
  let date= new Date().toISOString();
  Jobs.find( { $and:[{ start_date: { $lte: date } },{ end_date: { $gte: date } }] }).sort({start_date: -1}).then(function(job){
    // const obj = {job};
    
    console.log(date);
    console.log(job);
    // console.log(job.location)
    res.send(job); 
     });
     
    })

//job details viewing
// pending work...
route.get('/job/:id',function(req,res){
  const id = req.params.id;

  Jobs.findOne({_id: id})
    .then((job)=>{
      console.log("in job apply page backend"+job);
        res.send(job);
    });    
}); 

 // updating student mail and job id to job collection

 route.put('/applyjob', async (req, res) => {
  console.log("in applyjob ");
  // console.log(req.body); 
  console.log(req.body);   
  console.log(req.body.id); 
  console.log(req.body.event); 

  
  try{
  await Jobs.findOneAndUpdate(
    { jobid: req.body.event }, 
    { $push: { applicants:{stud_ref:req.body.id}  } }
  
  )}catch(err){
      console.log("In error /update2")
      res.json({ message: err });
   }   
}); 

route.get('/history/:id',async (req,res)=>{
  console.log("in history (get req) :",req.params);
  try{
    const id = req.params.id;
    const applicant_data = await Jobs.find({applicants:{$elemMatch:{stud_ref:id}}}); 
    // res.json(stud_data);
    console.log("applicants found (in history):"+applicant_data);
    res.send(applicant_data);
}catch(err){
    console.log("profile data not correct");
    res.json({message: "data not fetched"})
}
});



module.exports = route;
    
   
