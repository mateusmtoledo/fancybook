const mongoose = require('mongoose');

const { Schema } = mongoose;

const LikeSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post ' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', LikeSchema);
