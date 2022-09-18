const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  avatar: { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  coverPhoto: { type: String, default: 'https://images.pexels.com/photos/706498/pexels-photo-706498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  friendList: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    /*
    status:
      'sent' (sent request to another user)
      'pending' (received request from another user)
      'friends' (users are friends)
    */
    status: String,
    default: [],
  }],
  username: { type: String },
  email: { type: String },
  password: { type: String, select: false },
  sample: { type: Boolean, default: false },
  googleId: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

UserSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
