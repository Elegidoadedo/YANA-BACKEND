const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/user');



router.put('/edit', (req, res, next) => {
  const data = req.body
  const user = req.session.currentUser._id;
  User.findByIdAndUpdate(user, data)
 
  .then((result)=>{

    res.status(200).json(data)
  })
  .catch(next)
});

router.patch('/alertmode', (req, res, next) => {
  let {mode} = req.body;
  if(mode === "true"){ mode = true} else if(mode === "false"){ mode = false}
  const user = req.session.currentUser._id;
  User.findByIdAndUpdate(user, { alertmode: mode })
  .then((result)=>{
    res.status(200).json(result)
  })
  .catch(next)
});

router.patch('/addContact', (req, res) => {
  const contact = req.body
  const id = req.session.currentUser._id;
  User.findById(id)
  .then(user =>{

    User.findOne( {username:contact.contact.contact})
    .then(friend =>{
      const friendId = friend._id;
      user.contacts.push(ObjectId(friendId))
      user.save()
      .then((result)=>{
        res.status(200).json(result)

      })
    .catch();  
    })
  .catch()  
  })
});



router.get('/info', (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
  .populate('contacts')
  .then((result)=>{
    res.status(200).json(result)
    
  })
  .catch(next)
});



module.exports = router;
