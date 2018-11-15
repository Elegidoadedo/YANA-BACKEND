const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Alerts = require('../models/alerts');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.put('/set', (req, res, next) => {
  let {longitude, latitude} = req.body
  let user = req.session.currentUser._id;
  User.findByIdAndUpdate(user, {"location":{"type": "Point","coordinates":[ longitude, latitude]}})
  .then((result)=>{
    res.status(200).json(result)
  })
  .catch(next)
});

router.post('/info', (req,res,next) =>{
  const user = req.session.currentUser;
  const {victim} = req.body;
  const result ={"user": user, "victim": victim}

  res.status(200).json(result)
})

router.post('/points', (req, res, next) =>{
  const user = req.session.currentUser.location;
  const {latitude, longitude} = req.body;
  
  const geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "symbolLayout": {
          "marker-color": "#0ffa1b",
          "marker-size": "medium",
          "marker-symbol": "star"
        },
        "geometry": {

        "type": "Point",
        "coordinates": [
          longitude,
          latitude
        ]
      }
      },
      {
        "type": "Feature",
        "symbolLayout": {
          "marker-color": "#fa1010",
          "marker-size": "medium",
          "marker-symbol": "triangle"
        },
        "geometry": user
      }
    ]
  }

    res.status(200).json(geojson)



})



    module.exports = router;