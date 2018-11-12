const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = require('../models/user');



router.patch('/edit', (req, res) => {
  const data = req.body
  const user = req.session.currentUser._id;
  User.findByIdAndUpdate(user, data)
  .then((result)=>{
    res.status(200).json(result)
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


// const id = req.session.currentUser._id; 
// const {code} = req.body
// Client.findById(id)
// .then(client => {
//   Professional.findOne({code})
//   .then(professional => {
//     if(!professional){
//       req.flash('error', 'El profesional no existe')
//       return res.redirect('/clients/add-favorite')
//     }
//     professionalId = professional._id

//     client.myProfessionals.forEach(item => {
//       if(professionalId.toString() === item._id.toString()){
//         req.flash('error', 'Ya tienes añadido este profesional')
//         return res.redirect('/clients/add-favorite')
//       }
//     })

//     client.myProfessionals.push(ObjectId(professionalId))
//     client.save()
//     .then(succes => {
//       req.flash('info', 'Añadido correctamente');
//       return res.redirect('/clients/my-favorites');
//     })
//     .catch(next)
//   })
//   .catch(next)
// })
// .catch(next)
// })

// router.get('/find', (req, res) => {
//   const userId = req.session.currentUser._id;
//   User.findById(userId)
//   .then((result)=>{
//     console.log(result)
//     res.status(200).json(result)
    
//   })
//   .catch(next)
// });



module.exports = router;
