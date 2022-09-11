const express = require ('express');
const router = express.Router();
const Placement = require('../models/placement');
const jwt = require('jsonwebtoken')


// Placement update by the employer
router.post('/add', (req,res)=>{
console.log("req.body offer",req.body);
    const placement = new Placement({
      job_id: req.body.offer.job_id,
      dwms_id: req.body.offer.dwms_id,
      email: req.body.offer.email,
      batch:req.body.offer.batch,
      name:req.body.offer.name,
      company: req.body.offer.company,
      designation: req.body.offer.designation,
      offer_date: req.body.offer.offer_date,
      ctc_per_annum: req.body.offer.ctc_per_annum
    })
    placement.save()
    .then(data => {
        res.json({"message":"Successfully registered", "status":"success"});
        console.log("success")
    })
    .catch(err => {
        res.json({"message":err,"status":"error"});
        console.log("error",err)
    })   
  });
  module.exports = router;
