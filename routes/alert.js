const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Alerts = require('../models/alerts');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.post('/add', (req, res, next) => {
  const  {id, heroes,location}  = req.body; 
  console.log('ESTO ES LOCATION',location)
  const newAlert = new Alerts({ 'creator': id, 'heroes': heroes, 'location': location})
  newAlert.save()
  .then((result)=>{
    res.status(200).json(result)
  })
  .catch(next)
}) 

router.post('/delete', (req,res,next) => {
  const { id } = req.body;
  Alerts.findOneAndDelete({"creator": id})
  .then((result)=>{
    res.status(200).json(result)
  })
  .catch(next)
})
router.get(`/`, (req,res,next) => {
  const id = req.session.currentUser._id;

  Alerts.find({"heroes": id})
  .populate('creator')
  .then((result)=>{
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
router.post('/deletemessage', (req,res,next) => {
  const {id} = req.body;
  User.findByIdAndUpdate(id, {$unset: {message:1}})
  .then( victim =>{

    victim.save()
    .then ( result =>{
      res.status(200).json(result)
    })
    .catch(next)
  })
})

    module.exports = router;