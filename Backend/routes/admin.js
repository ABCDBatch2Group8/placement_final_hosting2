const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const jwt=require('jsonwebtoken');


const adminModel=require('../models/subadmin');
const ictkStudModel=require('../models/ictak_student');
const courseModel=require('../models/course');
const employerModel=require('../models/employer');
const candidateModel=require('../models/candidates');
const jobsModels=require('../models/job');
const offerModel=require('../models/admn_offer');




//ADMIN LOGIN

router.post('/login',async(req,res)=>{
    try{
    
        const email=req.body.email;
        const password=req.body.password;
        console.log(email)
        console.log(password)
        const admindata=await adminModel.findOne({email:email})
        console.log('........usermail.....')
        console.log(admindata.email)
        console.log(admindata.password)
        if(admindata.password===password && admindata.status==='Enable')
        {
            console.log('validated');
            let payload = {subject:email+password}
            let token=jwt.sign(payload,'secretkey')
            // res.status(200).send({token});
            
            res.json({message:"Login successful",
                      status:"success",
                    tok:token})
        }
        else
        {
           // res.send('password not matching');
            console.log('pwd not matching')
            res.json({message:"Password not matching",
                status:"fail"})
        }
    }
    catch(error)
    {
        //res.status(400).send("invalid email");
        console.log('invalid email')
        res.json({"success":"false","msg":"invalid email"})
    }
    
})

//ADMIN SIGN UP

router.post('/signup',(req,res)=>{
    console.log("email :",req.body.email)
    console.log(req.body.email)
    adminModel.findOne({'email':req.body.email},function(err,user){
        if(user){
            var error = "email";
            var message = "Email already exists";
            res.json({msg:"Email already exists"});
        }
        else{
            const newAdmin={
                email:req.body.email,
                password:req.body.password
               }
               var subadmin=new adminModel(newAdmin);
               subadmin.save();
        }
    })
   
   })
   //LIST SUBADMINS

 router.get('/admins',(req,res)=>{
    adminModel.find({designation:{$ne:'Super Admin'}}).then(function(admins){
        res.send(admins);
    });

    });

    //DELETE SUB ADMIN

    router.delete('/delete/:id',(req,res)=>{
   
        id = req.params.id;
        adminModel.findByIdAndDelete({"_id":id})
        .then(()=>{
            console.log('success')
            res.send();
        })
      })

      //RESET ADMIN PASSWORD
      router.put('/reset/:id',(req,res)=>{
        let id =req.params.id;
        let pwd=req.body.password;
        adminModel.findByIdAndUpdate({"_id":id},{$set:{"password":pwd}})
        .then(function(){
            res.send();
            
      })
    })
    //Change status
    router.put('/status/:id',(req,res)=>{
        let id =req.params.id;
        let status=req.body.status;
        console.log(status)
        adminModel.findByIdAndUpdate({"_id":id},{$set:{"status":status}})
        .then(function(){
            res.send();    
      })
    })
      //CREATE ICTK STUDENT EMAIL ID

      router.post('/addictkstudent',(req,res)=>{
        console.log(req.body);
        const newstud={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email
           }
           ictkStudModel.findOne({'email':newstud.email}, function(err,val){
            if(err){
              console.log(err);
            }
             if(val === null){
                console.log(newstud)
                var student=new ictkStudModel(newstud);
                student.save();
            }
            else{
                console.log("data found in admin db")  
           }
      })
    })
	  
	 //GET STUDENT

      router.get('/student',(req,res)=>{
        const email=req.body.email;
        ictkStudModel.findOne({"email":email})
        .then((stud)=>{
            res.send(stud)
        })
    });

      //SHOW  ICTAK STUDENTS LIST

      router.get('/students',(req,res)=>{
        ictkStudModel.find().then(function(students){
            res.send(students);
    
        });
    
        });
        //DELETE ICTAK STUDENT

        router.delete('/deletestudent/:id',(req,res)=>{
   
            id = req.params.id;
            console.log(id);
            ictkStudModel.findByIdAndDelete({"_id":id})
            .then(()=>{
                                 console.log('...success')
                res.send();
            })
          })

//COUNT EMAIL OF STUDENTS
router.get('/emailcount/:email',(req,res)=>{
        let email=req.params.email;
        console.log(email)
        ictkStudModel.find({"email" : email}).count().then(function(studcount){
           console.log(studcount);
           res.json(studcount);
        });
    });


    //COUNT EMAIL OF ADMIN
router.get('/admincount/:email',(req,res)=>{
    let email=req.params.email;
    console.log(email)
    adminModel.find({"email" : email}).count().then(function(admncount){
       console.log(admncount);
       res.json(admncount);
    });
});
            
// CREATE ICTK COURSE LIST
router.post('/course',(req,res)=>{
    console.log(req.body.course)
    const newCourse={
        course:req.body.course,
        category:req.body.category
    }
    var Course=new courseModel(newCourse);
    Course.save();
})

//SHOW COURSES

router.get('/showcourse',(req,res)=>{
    courseModel.find().then(function(courses){
        res.send(courses);

    });

    });
//DELETE COURSE

router.delete('/deletecourse/:id',(req,res)=>{
    id=req.params.id;
    courseModel.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
        })

})

//SEND OFFER TO CADIDATE
router.post('/offer',(req,res)=>{
    console.log("req.body",req.body);
        const placement = {
          candidateid: req.body.candidateid,
          company: req.body.company,
          designation: req.body.designation,
          offer_date: req.body.offer_date,
          ctc_per_annum: req.body.ctc_per_annum
        }
        var offer=new offerModel(placement);
        offer.save()
        .then(data => {
            res.json({"message":"Successfully registered", "status":"success"});
            console.log("success")
        })
        .catch(err => {
            res.json({"message":err,"status":"error"});
            console.log("error",err)
        })   
      });

      router.get('/getoffers/:id',(req,res)=>{
        id=req.params.id;
        offerModel.findById({'_id':id})
        .then((joboffers)=>{
            res.send(joboffers)
        })
      })

//Biju


//CANDIDATE VIEW
router.get('/getcandidate/:id',(req,res)=>{
    id=req.params.id;
    candidateModel.findById({'_id':id})
    .then((studview)=>{
        res.send(studview);
    })

})

//GET STUDENT CANDIDATES LIST
router.get('/candidatelist',(req,res)=>{
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS");
    candidateModel.find().then(function(candidates){
        res.send(candidates);

    });
});

// GET EMPLOYER LIST
router.get('/employerlist',(req,res)=>{
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS");
    employerModel.find().then(function(employer){
        res.send(employer);

    });
});

//GET EMPLOYER PROFILE
router.get('/employerview/:id',function(req,res){
    const id = req.params.id;
    //console.log(id);
    employerModel.findOne({_id: id})
      .then((empview)=>{
          res.send(empview);
      });    
});

//DELETE EMPLOYER ACCOUNT
router.delete('/employerdel/:id',function(req,res){
    const id = req.params.id;
    //console.log(id);
    employerModel.findByIdAndDelete({"_id":id})
    .then(()=>{
        //console.log('delete success')
        //res.send();
        employerModel.find().then(function(employer){
            res.send(employer);    
        });
    })
    
});


//UPDATE EMPLOYER INFO
router.put('/updateemplinfo',(req,res)=>{    
    //console.log(req.body.companyInfo)
    id=req.body._id,
    title= req.body.title,
    phone = req.body.phone,
    gstin = req.body.gstin,
    companyInfo = req.body.companyInfo
    
    employerModel.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "phone":phone,
                                "gstin":gstin,
                                "companyInfo":companyInfo}})
   .then(function(){
       res.send();
   })
 })

 //RESET EMPLOYER STATUS
 router.put('/employerreset',(req,res)=>{    
    //console.log(req.body.empid)
    id=req.body.empid,
    statval= req.body.statset
    
    employerModel.findByIdAndUpdate({"_id":id},
                                {$set:{"disable_status":statval}})
                                .then(()=>{
                                    //console.log('reset success')
                                    //res.send();
                                    employerModel.find().then(function(employer){
                                        res.send(employer);    
                                    });
                                })   
 })

 //CREATE NEW EMPLOYER ACCOUNT
 router.post('/createemployer', async (req, res) => {

    employerModel.findOne({ "email": req.body.employer.email }).then(function (getEmail) {
      //Allow signup only if the email is not already registered 
      if (getEmail == null) {
        //console.log("req.body", req.body)
        const employer = new employerModel({
          title: req.body.employer.title,
          email: req.body.employer.email,
          phone: req.body.employer.phone,
          password: req.body.employer.password,
          gstin: req.body.employer.gstin,
          companyInfo: req.body.employer.companyInfo
        });
        employer.save()
          .then(data => {
            res.json({ "message": "Employer Record Created", "status": "success" });
            //console.log("success")
          })
          .catch(err => {
            res.json({ "message": err, "status": "error" });
            console.log("error", err)
          })
      }
      else {        
        //console.log("email exists")
        res.json({ "message": "Email ID already registered", "status": "error" })
      }
    })
  });

  // GET EMPLOYER COUNT
router.get('/employercount',(req,res)=>{    
    employerModel.count().then(function(empcount){
       //console.log(empcount);
       res.json(empcount);
    });
});

//GET ACTIVE EMPLOYERS COUNT
router.get('/activeemployers',(req,res)=>{    
    employerModel.find({"disable_status" : "N"}).count().then(function(empcount){
       //console.log(empcount);
       res.json(empcount);
    });
});

//GET STUDENTS COUNT
router.get('/studentcount',(req,res)=>{    
    candidateModel.count().then(function(stdcount){
       //console.log(empcount);
       res.json(stdcount);
    });
});

//GET JOBS COUNT
router.get('/jobscount',(req,res)=>{    
    jobsModels.count().then(function(jobcount){
       //console.log(jobcount);
       res.json(jobcount);
    });
});

//GET EMPLOYERS JOBS LIST
router.get('/employerjoblist/:id',function(req,res){
    const id = req.params.id;
    //console.log(id);

    jobsModels.find({"emp_ref" : id})
      .then((joblist)=>{
          res.send(joblist);
          //console.log(joblist);
      }); 
});

//RETURN JOB DETAILS
router.get('/jobpreview/:id',function(req,res){
    const jid = req.params.id;
    console.log(jid);
    
    jobsModels.findOne({_id: jid})
      .then((jobview)=>{
        console.log(jobview);
          res.send(jobview);
      }); 
        
});

//LISTING OF ALL JOBS
router.get('/joblistings',function(req,res){
        
    jobsModels.find()
      .then((joblist)=>{
          res.send(joblist);
          //console.log(joblist);
      }); 
        
});


module.exports=router;