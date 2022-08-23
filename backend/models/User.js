const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  avatar: { type: String },
  friendList: [{
    user: Schema.Types.ObjectId,
    /*
    status:
      'sent' (sent request to another user)
      'pending' (received request from another user)
      'friends' (users are friends)
    */
    status: String,
  }],
  username: { type: String },
  email: { type: String },
  password: { type: String, select: false },
});

module.exports = mongoose.model('User', UserSchema);
