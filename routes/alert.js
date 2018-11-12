const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Alerts = require('../models/alerts');


router.post('/addalert', (req, res, next) => {
  const { username, location} = req.body;

  const newAlert = new Alerts({ creator: Username, date: newdate(), location: location })
    
      newAlert.save()
      .then(result => {
        res.redirect(`/dashboard`);
      })
    }) 