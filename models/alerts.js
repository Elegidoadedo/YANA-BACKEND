const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const alertSchema = new Schema ({
  creator: {
    type: ObjectId,
    ref: 'User'
  },

  location:{
    type:{
      type: String,
      default: 'Point',
    },
    coordinates:[Number]
  },
  
  date: Date,

  heroes:[{
    type: ObjectId,
    ref: 'User'
  },]

  })
  alertSchema.index({ location: '2dsphere' });

const Alerts = mongoose.model('Alerts', alertSchema);

module.exports = Alerts;
