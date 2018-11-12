const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Alerts = require('../models/alerts');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.post('/add', (req, res, next) => {
  const  {id, heroes}  = req.body;  
  console.log("body =>",req.body)
  const newAlert = new Alerts({ 'creator': id, 'heroes': heroes})
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
router.get(`/:id`, (req,res,next) => {
  const { id } = req.params;

  Alerts.find({"heroes": id})
  .populate('creator')
  .then((result)=>{
    console.log(result)
    res.status(200).json(result)
  })
  .catch(next)
})

router.post('/message', (req,res,next) => {
  const {id, name} = req.body;
  User.findById(id)
  .then( victim =>{
    victim.message.push(name + " is going to you!");
    victim.save()
    .then ( result =>{
      res.status(200).json(result)
    })
    .catch(next)
  })
})


    module.exports = router;