const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 35 },
  lastName: { type: String, maxLength: 35 },
  bio: { type: String, maxLength: 155 },
  gender: {
    type: String,
    enums: ['male', 'female'],
  },
  avatar: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    minLength: 11,
    maxLength: 2083,
  },
  coverPhoto: { type: String, default: 'https://images.pexels.com/photos/706498/pexels-photo-706498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  friendList: {
    type: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: {
        type: String,
        required: true,
        enums: ['sent', 'pending', 'friends'],
        /*
        status:
          'sent' (sent request to another user)
          'pending' (received request from another user)
          'friends' (users are friends)
        */
      },
    }],
    default: [],
  },
  username: { type: String, maxLength: 35 },
  email: {
    type: String, required: true, minLength: 7, maxLength: 254,
  },
  password: {
    type: String, select: false, minLength: 6,
  },
  sample: { type: Boolean, default: false },
  googleId: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

UserSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
