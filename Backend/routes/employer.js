const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');
const jwt = require('jsonwebtoken')

// Employer signup 
router.post('/signup', async (req, res) => {

  Employer.findOne({ "email": req.body.employer.email }).then(function (getEmail) {
    //Allow signup only if the email is not already registered 
    if (getEmail == null) {
      console.log("req.body", req.body)
      const employer = new Employer({
        title: req.body.employer.title,
        email: req.body.employer.email,
        phone: req.body.employer.phone,
        password: req.body.employer.password,
        gstin: req.body.employer.gstin,
        companyInfo: req.body.employer.companyInfo
      });
      employer.save()
        .then(data => {
          
          res.json({ "message": "Successfully registered", "status": "success"});
          console.log("success")
        })
        .catch(err => {
          res.json({ "message": err, "status": "error" });
          console.log("error", err)
        })
    }
    else {
      // Customised error message when the user is already registered
      console.log("email exists")
      res.json({ "message": "Email already registered. Please login", "status": "error" })
    }
  })
});

// Employer login
router.post('/login', (req, res) => {
  var flag = false;

  const pwd = req.body.employer.password;

  const eml = req.body.employer.email;

  console.log("within login", req.body)

  Employer.findOne({ "email": eml }).then(function (getUser) {
    console.log("getUser" + getUser);
    // Customised error mesage when the login data doesnt exist
    if (getUser == null) {
      console.log("In null")
      res.json({ "message": "This email address is not recognised, please check you have entered the correct email", "status": "error" });
    }
    else {
      console.log("In not null")
      if (getUser.disable_status == "N") {
        if (pwd == getUser.password) {
          console.log("Valid login")
          let payload={subject:getUser.username+getUser.password}
          let token = jwt.sign(payload,'secretKey')
          res.json({ "message": "Login successful", "status": "success", "eid": getUser._id,"company":getUser.title,"token":token });
          flag = true
          console.log(getUser);
        }
        else {
          res.json({ "message": "Sorry your password is incorrect", "status": "error" });
          console.log("Incorrect password");
        }
      }
      else {
        if (getUser.disable_status == "Y") {
          res.json({ "message": "ID suspended. Please contact ICTAK placement officer", "status": "error" });
        }
      }
    }
  }
  )
})

router.get('/profile/:id', async (req, res) => {
  console.log("in book route");
  console.log(req.params);
  try {
    const id = req.params.id;
    const getEmp = await Employer.findById({ "_id": id });
    res.json(getEmp);
    console.log("getEmp" + getEmp);
  } catch (err) {
    console.log("In error /profile");
    res.json({ "message": err })
  }
});

router.put('/profile/update', async (req, res) => {
  console.log("in update ");
  console.log(req.body.title);
  console.log("req body:");
  console.log(req.body);

  try {
    await Employer.findByIdAndUpdate({ "_id": req.body._id },
      {
        $set: {
          "title": req.body.title,
          "email": req.body.email,
          "phone": req.body.phone,
          "password": req.body.password,
          "gstin": req.body.gstin,
          "companyInfo": req.body.companyInfo
        }
      }
    )
  } catch (err) {
    console.log("In error /update")
    res.json({ message: err });
  }
});

module.exports = router;