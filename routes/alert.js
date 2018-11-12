const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Alerts = require('../models/alerts');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.post('/add', (req, res, next) => {
  const  {id}  = req.body;  
  console.log("body =>",req.body)
  const newAlert = new Alerts({ 'creator': id})
  newAlert.save()
  .then((result)=>{
    res.status(200).json(result)
  })
  .catch(next)
}) 

router.post('/delete', (req,res,next) => {
  const { id } = req.body;
 
  console.log("body =>", id)
  Alerts.findOneAndDelete({"creator": id})
  .then((result)=>{
    console.log(result)
    res.status(200).json(result)
  })
  .catch(next)
})


    module.exports = router;