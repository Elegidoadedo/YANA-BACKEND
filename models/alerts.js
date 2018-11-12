const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const alertSchema = new Schema ({
  creator: {
    type: ObjectId,
    ref: 'User'
  },

  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
  
  date: Date,

  heroes:[{
    type: ObjectId,
    ref: 'User'
  },]

  })


const Alerts = mongoose.model('Alerts', alertSchema);

module.exports = Alerts;
