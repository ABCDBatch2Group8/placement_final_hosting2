const { ObjectID } = require('bson');
const express = require('express');
const job = require('../models/job');
const router = express.Router();
const Job = require('../models/job');
const ObjectId = require("mongodb").ObjectId;
const Student = require('../models/student');


getJob = [{
  jobid: '',
  position: '',
  jd_text: '',
  number: '',
  YearOfPassout: ''
}]

// Job posting by the employer
router.post('/jobpost', (req, res) => {
  console.log("req body",req.body)

  Job.findOne({ "jobid": req.body.Job.jobid }).then(function (getJobid) {
    if (getJobid == null) {
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
          res.json({ "message": "Successfully registered", "status": "success" });
          console.log("success")
        })
        .catch(err => {
          res.json({ "message": err, "status": "error" });
          console.log("error", err)
        })
    }
    else {
      console.log("Job Id exists")
      res.json({ "message": "JobId already exists. Please update the job" })
    }
  })
});

// Get the list of jobs posted in job collection
router.get('/joblist/:empref', async (req, res) => {
  console.log("in job route get");

  try {
    getJob = await Job.find({emp_ref:req.params.empref}, { "jobid": 1, "position": 1, "jd_text": 1, "number": 1 })
    res.send(getJob);
    console.log("getJob" + getJob);
  } catch (err) {
    console.log("In error /job get");
    console.log("error is", err)
    res.json({ message: err })
  }
})

router.get('/jobview/:id', async (req, res) => {
  console.log("in book route");
  console.log(req.params);
  try {
    const id = req.params.id;
    const getvJob = await Job.findById({ "_id": id });
    res.json(getvJob);
    console.log("getEmp" + getvJob);
  } catch (err) {
    console.log("In error /profile");
    console.log("error is", err)
    res.json({ message: err })
  }
});

// studDetails1 = [{
//   qualification: '',
//   stream: '',
//   employmentStatus: '',
//   careerBreak: '',
//   YearOfPassout: null
// }]


//If shortlisting is based on year of pass out alone
// Tested query
router.get('/sl/year', async (req, res) => {
  console.log("in shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const getApp = await Job.findById({ "_id": id }, { "applicants": 1 });
    // res.json(getJob);
    console.log("getApp" + getApp);
    studDetails = []
    try {
      console.log("student ref", getApp.applicants[0].stud_ref);
      for (let i = 0; i < getApp.applicants.length; i++) {
        // sid = getApp.applicants[i].stud_ref
        console.log("student ref", i, getApp.applicants[i].stud_ref);
        const getStud = await Student.findById({ "_id": getApp.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1, "skills": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        console.log("get pasout is ", getStud.YearOfPassout)
        if (getStud.YearOfPassout >= passout) {
          studDetails.push(getStud);
        }
      }
      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

// studDetails2 = [{
//   qualification: '',
//   stream: '',
//   employmentStatus: '',
//   careerBreak: '',
//   ICTAKscor: null,
//   courseInICTAK: ''
// }]
// If shortlisting is based on skills provided in the job description
// Tested query
router.get('/sl/skill', async (req, res) => {
  console.log("in skill shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1, "skills": 1 });
    console.log("getJob" + getJob);
    studDetails = []
    try {
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {

        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref },
          { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1, "skills": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        // var count = 0;
        loop2:
        for (let j = 0; j < getJob.skills.length; j++) {
          loop3:
          for (let k = 0; k < getStud.skills.length; k++) {
            console.log("i=", i)
            console.log("jobskill", j, getJob.skills[j].item_text)
            console.log("studskill", k, getStud.skills[k].item_text)
            if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
              studDetails.push(getStud);
              console.log("matched")
              // If atleast one skill is matched, shortlist that applicant
              break loop2;
            }
          }
        }
      }
      res.json(studDetails)
      console.log("studDetails", studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

// If shortlisting is based on course in ICTAK
// Tested query
router.get('/sl/course', async (req, res) => {
  console.log("in course shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const course = req.query.course;
    const getApp = await Job.findById({ "_id": id }, { "applicants": 1 });
    console.log("getApp" + getApp);
    studDetails = []
    try {
      for (let i = 0; i < getApp.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getApp.applicants[i].stud_ref },
          { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        console.log("course are", getStud.courseInICTAK, course);
        if (getStud.courseInICTAK == course) {
          console.log("ICTAK score", getStud.ICTAKscore);
          if (getStud.ICTAKscore >= 40) {
            console.log("push");
            studDetails.push(getStud);
          }
        }
      }
      res.json(studDetails)
      console.log("studdetails", studDetails);
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});


//If shortlisting is based on year of pass out and course in ICTAK
// Tested query
router.get('/sl/cy', async (req, res) => {
  console.log("in cy shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const course = req.query.course;
    const getApp = await Job.findById({ "_id": id }, { "applicants": 1 });
    console.log("getApp" + getApp);
    studDetails = []
    try {
      console.log("student ref", getApp.applicants[0].stud_ref);
      for (let i = 0; i < getApp.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getApp.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1, "skills": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        if ((getStud.YearOfPassout >= passout) & (getStud.courseInICTAK == course) & (getStud.ICTAKscore >= 40)) {
          studDetails.push(getStud);
          //   }
          // }
        }
      }

      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

//If shortlisting is based on year of pass out and matching skills
// Tested query
router.get('/sl/ys', async (req, res) => {
  console.log("in ys shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1, "skills": 1 });
    console.log("getJob" + getJob);
    studDetails = []
    try {
      console.log("length", getJob.applicants.length);
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1, "skills": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        loop2:
        if ((getStud.YearOfPassout >= passout)) {
          console.log("hi", getJob.skills.length);
          loop3:
          for (let j = 0; j < getJob.skills.length; j++) {
            loop4:
            for (let k = 0; k < getStud.skills.length; k++) {
              console.log("i=", i)
              console.log("jobskill", j, getJob.skills[j].item_text)
              console.log("studskill", k, getStud.skills[k].item_text)
              if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
                studDetails.push(getStud);
                console.log("matched")
                // If atleast one skill is matched, shortlist that applicant
                break loop3;
              }
            }
          }
        }
      }

      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

//If shortlisting is based on course in ICTAK and matching skills
// Tested query
router.get('/sl/sc', async (req, res) => {
  console.log("in sc shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const skill = req.query.skill;
    const course = req.query.course;
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1, "skills": 1 });
    console.log("getJob" + getJob);
    studDetails = []
    try {
      console.log("length", getJob.applicants.length);
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1, "skills": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        loop2:
        if ((getStud.courseInICTAK == course) & (getStud.ICTAKscore >= 40)) {
          console.log("hi", getJob.skills.length);
          loop3:
          for (let j = 0; j < getJob.skills.length; j++) {
            loop4:
            for (let k = 0; k < getStud.skills.length; k++) {
              console.log("i=", i)
              console.log("jobskill", j, getJob.skills[j].item_text)
              console.log("studskill", k, getStud.skills[k].item_text)
              if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
                studDetails.push(getStud);
                console.log("matched")
                // If atleast one skill is matched, shortlist that applicant
                break loop3;
              }
            }
          }
        }
      }
      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

//If shortlisting is based on year of passout, course in ICTAK and matching skills
// Tested query
router.get('/sl/ysc', async (req, res) => {
  console.log("in ysc shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const course = req.query.course;
    console.log("passout,course", passout, course)
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1, "skills": 1 });
    console.log("getJob" + getJob);
    studDetails = []
    try {
      console.log("length", getJob.applicants.length);
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1, "skills": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        console.log("loop1:")
        loop2:
        console.log("psout", getStud.YearOfPassout)
        console.log("courseICTAK", getStud.courseInICTAK)
        console.log("score", getStud.ICTAKscore)

        if ((getStud.YearOfPassout >= passout) & (getStud.courseInICTAK == course) & (getStud.ICTAKscore >= 40)) {
          console.log("hi", getJob.skills.length);
          loop3:
          for (let j = 0; j < getJob.skills.length; j++) {
            loop4:
            for (let k = 0; k < getStud.skills.length; k++) {
              console.log("i=", i)
              console.log("jobskill", j, getJob.skills[j].item_text)
              console.log("studskill", k, getStud.skills[k].item_text)
              if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
                studDetails.push(getStud);
                console.log("matched")
                // If atleast one skill is matched, shortlist that applicant
                break loop3;
              }
            }
          }
        }
      }
      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});
// ********** Update application status

router.put('/mark/sl', async (req, res) => {
  console.log("in update mar/sl ");
  console.log("body is", req.body._id);

  try {
    // await Job.findOneAndUpdate({ "applicants.stud_ref": req.body._id },
    //   await Job.updateOne({ "applicants.stud_ref": req.body._id },
    //   {
    //     $set: {
    //       "applicants.shortlist_status": 1,
    //     }
    //   }
    // )
    const x = await job.findOne({ "applicants.stud_ref": req.body._id })
    const updateId = x._id
    console.log("updateid is", updateId)

    for (let i = 0; i < x.applicants.length; i++) {
      console.log("stud,body", x.applicants[i].stud_ref, req.body._id)
      if (x.applicants[i].stud_ref === req.body._id) {
        console.log("matched", x.applicants[i].stud_ref, req.body._id)
        var updateId1 = x.applicants[i]._id
        // console.log("updateid is",x.applicants[i]._id)
      }
    }
    console.log("ids are", updateId, " ", updateId1, " ", req.body._id);
    try {
      await Job.update(
        {
          "_id": updateId
        },
        {
          $set: {
            "applicants.$[elemA].shortlist_status": 1,
            "applicants.$[elemA].application_status": "shortlisted"
          }
        },
        {
          "arrayFilters": [
            {
              "elemA._id": updateId1,
              "elemA.stud_ref": req.body._id
            }
          ]
        }
      )
    }  catch (err) {
      console.log("In error /update")
      console.log("error message", err)
      res.json({ message: err });
    }

      // await Job.updateOne({_id : updateId , "applicants._id": updateId1} , {$inc: {"applicants.$.shortlist_status": 1}})

      // const x = Job.find(
      //   {"applicants.stud_ref": req.body._id}, 
      //   {_id: 0, applicants: {$elemMatch: {stud_ref: req.body._id}}});

      //   console.log("found",x);
      // const arrOfx = Object.entries(x).map(entry => entry[1]);

      // console.log("x.applicants.length",x.applicants.length)
      // for (let i=0;i<x.applicants.length;i++){
      //   console.log("stud,body",x.applicants[i].stud_ref,req.body._id)
      //   if (x.applicants[i].stud_ref === req.body._id){
      //     console.log("matched",x.applicants[i].stud_ref,req.body._id )
      //     const updateId = x.applicants[i]._id
      //     console.log("updateid is",x.applicants[i]._id)
      //   }
      // }
      // const x = await Job.findOne({ "applicants.stud_ref": req.body._id })

    //    Job.updateOne(
    //     {
    //       _id: updateId,
    //       applicants: { $elemMatch: { stud_ref: req.body._id } }
    //     },
    //     { $set: { "applicants.$.shortlist_status" : 1 } }
    //  )
    //  const y = Job.findOne(
    //   {
    //     _id: updateId,
    //     applicants: { $elemMatch: { stud_ref: req.body._id } }
    //   // },
    //   // { $set: { "applicants.$.shortlist_status" : 1 } }
    //   })
    //   console.log("found",y)

    } catch (err) {
    console.log("In error /update")
    console.log("error message", err)
    res.json({ message: err });
  }
  console.log("at end")
});

router.get('/get/sl', async (req, res) => {
  console.log("in job route get");
  console.log(req.query);

  try {
    getJob = await Job.findOne({jobid:req.query.jobId}, { "emp_ref": 1, "applicants": 1 })
    console.log("emp ref are ",getJob.emp_ref,req.query.empId)
    if (getJob.emp_ref != req.query.empId){
      console.log("wron employer")
      res.json({ "message": "JobId posted by another employer. No access to update the status" })
    }
    else{
      console.log("right employer")
      let display = [{
        name: '',
        email: '',
        application_status: '' 
      }]
      let j=0;
      console.log("getJob is",getJob)
      for(let i=0;i<getJob.applicants.length;i++){
          console.log("getJob.applicants[i].shortlist_status",getJob.applicants[i].shortlist_status)
        if (getJob.applicants[i].shortlist_status === true){
          console.log("shortlisted")
          getStuden = await Student.findById(getJob.applicants[i].stud_ref)
            display[j].name = getStuden.name;
            display[j].email = getStuden.email;
            display[j].application_status = getJob.applicants[i].application_status
            console.log("display",j,display[j])
        }
      }
      console.log("display" + display);
      res.send(display);
    }
    
  } catch (err) {
    console.log("In error /job get");
    console.log("error is", err)
    res.json({ message: err })
  }
});


module.exports = router;