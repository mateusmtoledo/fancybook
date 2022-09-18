const mongoose = require('mongoose');

const { Schema } = mongoose;

const LikeSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', LikeSchema);
