const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Comment', CommentSchema);
