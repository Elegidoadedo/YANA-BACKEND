const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  phone: Number,
  email: String,
  avatar: String,
  alertmode: false,
  contacts:[{
    type: ObjectId,
    ref: 'User'
  }],
  location:{
    type:{
      type: String,
      default: 'Point',
    },
    coordinates:[Number]
  },
  message: [{
    username: String,
    avatar: String
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;