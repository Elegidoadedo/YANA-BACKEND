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
    console.log(data)
    res.status(200).json(data)
  })
  .catch(next)
});

router.patch('/addContact', (req, res) => {
  const contact = req.body
  console.log("conatcto:", contact.contact.contact)
  const id = req.session.currentUser._id;
  console.log("mi id", id)
  User.findById(id)
  .then(user =>{
    console.log("mi user", user)
    User.findOne( {username:contact.contact.contact})
    .then(friend =>{
      console.log("mi amigo",friend)
      const friendId = friend._id;
      console.log("esta es la ID de mi amigo: ", friendId )
      user.contacts.push(ObjectId(friendId))
      user.save()
      .then((result)=>{
        res.status(200).json(result)
        .catch(next)
      })
    .catch(console.log("no ha encontrado el friend"));  
    })
  .catch(console.log("NO HA ENCONTRADO user"))  
  })
});



router.get('/info', (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
  .populate('contacts')
  .then((result)=>{
    console.log(result)
    res.status(200).json(result)
    
  })
  .catch(next)
});



module.exports = router;
