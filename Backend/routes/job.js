const express = require ('express');
const router = express.Router();
const Job = require('../models/job');

getJob = [{
  jobid : '',
  position: '',
  jd_text: '',
  number: ''
}]

// Job posting by the employer
router.post('/jobpost',(req,res)=>{
    
    const job = new Job({
      jobid: req.body.Job.jobid,
      position: req.body.Job.position,
      emp_ref: req.body.Job.emp_ref,
      company: req.body.Job.company,
      jd_text: req.body.Job.jd_text,
      number: req.body.Job.number,
      salary: req.body.Job.salary,
      skills: req.body.Job.skills,
      location: req.body.Job.location,
      start_date: req.body.Job.start_date,
      end_date: req.body.Job.end_date
    })
    job.save()
    .then(data => {
        res.json({"message":"Successfully registered", "status":"success"});
        console.log("success")
    })
    .catch(err => {
        res.json({"message":err,"status":"error"});
        console.log("error",err)
    })   
  });

  // Get the list of jobs posted in job collection
router.get('/joblist', async (req,res)=>{
  console.log("in job route get");
  
  try{
      getJob = await Job.find({},{"jobid":1,"position":1,"jd_text":1,"number":1})
      res.send(getJob);
      console.log("getJob"+getJob);
  }catch(err){
      console.log("In error /job get");
      console.log("error is",err)
      res.json({message: err})
  }
})

router.get('/jobview/:id', async (req, res) => {
  console.log("in book route");
  console.log(req.params);
  try {
    const id = req.params.id;
    const getJob = await Job.findById({ "_id": id });
    res.json(getJob);
    console.log("getEmp" + getJob);
  } catch (err) {
    console.log("In error /profile");
    console.log("error is",err)
    res.json({ message: err })
  }
});

//If shortlisting is based on year of pass out alone
router.get('/job/sl/year', async (req, res) => {
  console.log("in book route");
  console.log(req.params);
  try {
    const id = req.params.id;
    const getJob = await Job.findById({ "_id": id });
    // res.json(getJob);
    console.log("getEmp" + getJob);
    studDetails = []
    try{
      for (i=0;i<getJob.applicants.length;i++){
      sid = getJob.applicant[i].stud_ref
      const getStud = await Job.findById({"_id":sid})
      studDetails.push(getStud);
      }
      console.log("studDetails",studDetails)
      res.json(studDetails)
      }catch (err) {
        console.log("In error /shortlist");
        console.log("error is",err)
        res.json({ message: err })
    }

  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is",err)
    res.json({ message: err })
  }
});

  module.exports = router;